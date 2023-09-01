import * as _ from "lodash";
import * as changeCase from "change-case";
import * as vscode from "vscode";
import * as fs from "fs";

import { getViewTemplate } from "../templates/view.template";
import { getViewModelTemplate } from "../templates/view-model.template";
import { createDirectory, createFile, promptForTargetDirectory, promptInput } from "../common/common";

export const newView = async (uri: vscode.Uri) => {
    const viewName = await promptInput("View 이름 (띄어쓰기 구분)", "video list");
    if (_.isNil(viewName) || viewName.trim() === "") {
        vscode.window.showErrorMessage("The view name must not be empty");
        return;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !fs.lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await promptForTargetDirectory();
        if (_.isNil(targetDirectory)) {
            vscode.window.showErrorMessage("Please select a valid directory");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    const snakeViewlName = changeCase.snakeCase(viewName);
    const pascalViewName = changeCase.pascalCase(viewName);

    const targetDirectoryPath = `${targetDirectory}/${snakeViewlName}`;
    if (!fs.existsSync(targetDirectoryPath)) {
        await createDirectory(targetDirectoryPath);
    }

    try {
        await createViewTemplate(snakeViewlName, pascalViewName, targetDirectoryPath);
        await createViewModelTemplate(snakeViewlName, pascalViewName, targetDirectoryPath);
        vscode.window.showInformationMessage(`Successfully Generated ${pascalViewName} View`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};

function createViewTemplate(
    snakeViewlName: string,
    pascalViewName: string,
    targetDirectory: string
) {
    const filePath = `${targetDirectory}/${snakeViewlName}_view.dart`;
    return createFile(filePath, getViewTemplate(snakeViewlName, pascalViewName));
}

function createViewModelTemplate(
    snakeViewlName: string,
    pascalViewName: string,
    targetDirectory: string
) {
    const filePath = `${targetDirectory}/${snakeViewlName}_view_model.dart`;
    return createFile(filePath, getViewModelTemplate(pascalViewName));
}

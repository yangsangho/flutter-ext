import * as _ from "lodash";
import * as changeCase from "change-case";
import * as vscode from "vscode";
import * as fs from "fs";
import { getModelTemplate } from "../templates/model.template";
import { createDirectory, createFile, promptForTargetDirectory, promptInput } from "../common/common";

export const newModel = async (uri: vscode.Uri) => {
    const modelName = await promptInput("Model 이름 (띄어쓰기 구분)", "group user");
    if (_.isNil(modelName) || modelName.trim() === "") {
        vscode.window.showErrorMessage("The model name must not be empty");
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

    const snakeModelName = changeCase.snakeCase(modelName);
    const pascalModelName = changeCase.pascalCase(modelName);

    const targetDirectoryPath = `${targetDirectory}/${snakeModelName}`;
    if (!fs.existsSync(targetDirectoryPath)) {
        await createDirectory(targetDirectoryPath);
    }

    try {
        await createModelTemplate(snakeModelName, pascalModelName, targetDirectoryPath);
        vscode.window.showInformationMessage(`${pascalModelName} Model 생성 완료!`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};

function createModelTemplate(
    snakeModelName: string,
    pascalModelName: string,
    targetDirectory: string
) {
    const filePath = `${targetDirectory}/${snakeModelName}.dart`;
    return createFile(filePath, getModelTemplate(snakeModelName, pascalModelName));
}

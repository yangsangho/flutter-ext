import * as _ from "lodash";
import * as changeCase from "change-case";
import * as vscode from "vscode";
import * as fs from "fs";
import { createFile, promptForTargetDirectory, promptInput } from "../common/common";
import { getWidgetTemplate } from "../templates/widget.template";

export const newWidget = async (uri: vscode.Uri) => {
    const widgetName = await promptInput("Widget 이름 (띄어쓰기 구분)", "round button");
    if (_.isNil(widgetName) || widgetName.trim() === "") {
        vscode.window.showErrorMessage("The widget name must not be empty");
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

    const snakeWidgetName = changeCase.snakeCase(widgetName);
    const pascalWidgetName = changeCase.pascalCase(widgetName);

    try {
        await createWidgetTemplate(snakeWidgetName, pascalWidgetName, targetDirectory);
        vscode.window.showInformationMessage(`${pascalWidgetName} Widget 생성 완료!`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};

function createWidgetTemplate(
    snakeModelName: string,
    pascalModelName: string,
    targetDirectory: string
) {
    const filePath = `${targetDirectory}/${snakeModelName}.dart`;
    return createFile(filePath, getWidgetTemplate(pascalModelName));
}

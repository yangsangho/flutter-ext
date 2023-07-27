import * as _ from "lodash";
import * as changeCase from "change-case";
import * as mkdirp from "mkdirp";

import {
    InputBoxOptions,
    OpenDialogOptions,
    Uri,
    window,
} from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getModelTemplate } from "../templates/model.template";

export const newModel = async (uri: Uri) => {
    const modelName = await promptForModelName();
    if (_.isNil(modelName) || modelName.trim() === "") {
        window.showErrorMessage("The page name must not be empty");
        return;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await promptForTargetDirectory();
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Please select a valid directory");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    const targetDirectoryPath = `${targetDirectory}/${modelName}`;
    if (!existsSync(targetDirectoryPath)) {
        await createDirectory(targetDirectoryPath);
    }

    const pascalCaseModelName = changeCase.pascalCase(modelName);

    try {
        await createModelTemplate(modelName, targetDirectoryPath);
        window.showInformationMessage(
            `Successfully Generated ${pascalCaseModelName} Model`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};

function promptForModelName(): Thenable<string | undefined> {
    const modelNamePromptOptions: InputBoxOptions = {
        prompt: "Model Name",
        placeHolder: "group_user",
    };
    return window.showInputBox(modelNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create the model in",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

function createModelTemplate(
    modelName: string,
    targetDirectory: string
) {
    const snakeCaseModelName = changeCase.snakeCase(modelName);
    const targetPath = `${targetDirectory}/${snakeCaseModelName}.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getModelTemplate(modelName),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
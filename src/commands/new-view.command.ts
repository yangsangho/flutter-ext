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
import { getViewTemplate } from "../templates/view.template";
import { getViewModelTemplate } from "../templates/view-model.template";

export const newView = async (uri: Uri) => {
    const viewName = await promptForViewName();
    if (_.isNil(viewName) || viewName.trim() === "") {
        window.showErrorMessage("The view name must not be empty");
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

    const targetDirectoryPath = `${targetDirectory}/${viewName}`;
    if (!existsSync(targetDirectoryPath)) {
        await createDirectory(targetDirectoryPath);
    }

    try {
        await createViewTemplate(viewName, targetDirectoryPath);
        await createViewModelTemplate(viewName, targetDirectoryPath);

        const pascalCaseViewlName = changeCase.pascalCase(viewName);
        window.showInformationMessage(
            `Successfully Generated ${pascalCaseViewlName} View`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};

function promptForViewName(): Thenable<string | undefined> {
    const viewNamePromptOptions: InputBoxOptions = {
        prompt: "View Name(snake case)",
        placeHolder: "group_user",
    };
    return window.showInputBox(viewNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create the view in",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

function createViewTemplate(
    viewName: string,
    targetDirectory: string
) {
    const snakeCaseViewName = changeCase.snakeCase(viewName);
    const targetPath = `${targetDirectory}/${snakeCaseViewName}_view.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewTemplate(viewName + '_view', viewName + '_view_model'),
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

function createViewModelTemplate(
    viewName: string,
    targetDirectory: string
) {
    const snakeCaseViewName = changeCase.snakeCase(viewName);
    const targetPath = `${targetDirectory}/${snakeCaseViewName}_view_model.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewModelTemplate(viewName + '_view_model'),
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
import * as mkdirp from "mkdirp";
import * as vscode from "vscode";
import * as _ from "lodash";
import * as fs from "fs";

export function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}

export function promptInput(prompt: string, placeHolder: string): Thenable<string | undefined> {
    const modelNamePromptOptions: vscode.InputBoxOptions = {
        prompt: prompt,
        placeHolder: placeHolder,
    };
    return vscode.window.showInputBox(modelNamePromptOptions);
}


export async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create",
        canSelectFolders: true,
    };

    return vscode.window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

export function createFile(
    filePath: string,
    fileContents: string,
) {
    if (fs.existsSync(filePath)) {
        throw Error(`${filePath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        fs.writeFile(
            filePath,
            fileContents,
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

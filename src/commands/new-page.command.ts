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
import { getPageBarrelTemplate, getBlocEventTemplate, getBlocStateTemplate, getBlocTemplate, getViewBarrelTemplate, getViewViewTemplate, getViewPageTemplate } from "../templates";

export const newPage = async (uri: Uri) => {
    const pageName = await promptForPageName();
    if (_.isNil(pageName) || pageName.trim() === "") {
        window.showErrorMessage("The page name must not be empty");
        return;
    }

    let isBase = await promptForBlocType();

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

    const targetDirectoryPath = `${targetDirectory}/${pageName}`;
    if (!existsSync(targetDirectoryPath)) {
        await createDirectory(targetDirectoryPath);
    }

    const pascalCaseBlocName = changeCase.pascalCase(pageName);
    try {
        await generateBlocCode(pageName, targetDirectoryPath, isBase);
        window.showInformationMessage(
            `Successfully Generated ${pascalCaseBlocName} Page`
        );
    } catch (error) {
        window.showErrorMessage(
            `Error:
          ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};

function promptForPageName(): Thenable<string | undefined> {
    const blocNamePromptOptions: InputBoxOptions = {
        prompt: "Bloc Name",
        placeHolder: "counter",
    };
    return window.showInputBox(blocNamePromptOptions);
}

async function promptForBlocType(): Promise<boolean> {
    const result = await window.showQuickPick(['default bloc', 'base bloc'], { placeHolder: 'select bloc type' });
    return result === 'base bloc';
}

async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create the page in",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

async function generateBlocCode(
    pageName: string,
    targetDirectory: string,
    isBase: boolean
) {
    const viewDirectoryPath = `${targetDirectory}/view`;
    if (!existsSync(viewDirectoryPath)) {
        await createDirectory(viewDirectoryPath);
    }

    const blocDirectoryPath = `${targetDirectory}/bloc`;
    if (!existsSync(blocDirectoryPath)) {
        await createDirectory(blocDirectoryPath);
    }

    await Promise.all([
        createPageBarrelTemplate(pageName, targetDirectory),
        createViewBarrelTemplate(pageName, viewDirectoryPath),
        createViewViewTemplate(pageName, viewDirectoryPath),
        createViewPageTemplate(pageName, viewDirectoryPath, isBase),
        createBlocEventTemplate(pageName, blocDirectoryPath),
        createBlocStateTemplate(pageName, blocDirectoryPath, isBase),
        createBlocTemplate(pageName, blocDirectoryPath, isBase),
    ]);
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

function createPageBarrelTemplate(
    pageName: string,
    targetDirectory: string
) {
    const snakeCaseBlocName = changeCase.snakeCase(pageName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getPageBarrelTemplate(pageName),
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

function createViewBarrelTemplate(
    pageName: string,
    targetDirectory: string
) {
    const targetPath = `${targetDirectory}/view.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewBarrelTemplate(pageName),
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

function createViewViewTemplate(
    pageName: string,
    targetDirectory: string
) {
    const snakeCaseBlocName = changeCase.snakeCase(pageName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_view.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewViewTemplate(pageName),
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

function createViewPageTemplate(
    pageName: string,
    targetDirectory: string,
    isBase: boolean
) {
    const snakeCaseBlocName = changeCase.snakeCase(pageName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_page.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${targetPath} already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getViewPageTemplate(pageName, isBase),
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

function createBlocEventTemplate(
    pageName: string,
    targetDirectory: string
) {
    const snakeCaseBlocName = changeCase.snakeCase(pageName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_event.dart`;

    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_event.dart already exists`);
    }

    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getBlocEventTemplate(pageName),
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

function createBlocStateTemplate(
    pageName: string,
    targetDirectory: string,
    isBase: boolean,
) {
    const snakeCaseBlocName = changeCase.snakeCase(pageName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_state.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_state.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(
            targetPath,
            getBlocStateTemplate(pageName, isBase),
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

function createBlocTemplate(
    blocName: string,
    targetDirectory: string,
    isBase: boolean
) {
    const snakeCaseBlocName = changeCase.snakeCase(blocName);
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_bloc.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_bloc.dart already exists`);
    }
    return new Promise<void>(async (resolve, reject) => {
        writeFile(targetPath, getBlocTemplate(blocName, isBase),
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

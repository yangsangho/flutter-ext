import * as changeCase from "change-case";

export function getPageBarrelTemplate(blocName: string): string {
    const snakeCaseBlocName = changeCase.snakeCase(blocName);

    return `export 'bloc/${snakeCaseBlocName}_bloc.dart';
export 'view/view.dart';
`;
}

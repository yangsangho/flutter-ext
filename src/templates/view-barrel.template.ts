import * as changeCase from "change-case";

export function getViewBarrelTemplate(blocName: string): string {
    const snakeCaseBlocName = changeCase.snakeCase(blocName);

    return `export '${snakeCaseBlocName}_page.dart';
export '${snakeCaseBlocName}_view.dart';
`;
}

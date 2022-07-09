import * as changeCase from "change-case";

export function getPageBarrelTemplate(pageName: string): string {
    const snakeCasePageName = changeCase.snakeCase(pageName);

    return `export 'bloc/${snakeCasePageName}_bloc.dart';
export 'view/view.dart';
`;
}

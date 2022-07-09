import * as changeCase from "change-case";

export function getViewBarrelTemplate(pageName: string): string {
    const snakeCasePageName = changeCase.snakeCase(pageName);

    return `export '${snakeCasePageName}_page.dart';
export '${snakeCasePageName}_view.dart';
`;
}

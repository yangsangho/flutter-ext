import * as changeCase from "change-case";

export function getBlocEventTemplate(pageName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(pageName);
  const snakeCaseBlocName = changeCase.snakeCase(pageName);
  return `part of '${snakeCaseBlocName}_bloc.dart';

abstract class ${pascalCaseBlocName}Event extends Equatable {
  const ${pascalCaseBlocName}Event();

  @override
  List<Object> get props => [];
}
`;
}

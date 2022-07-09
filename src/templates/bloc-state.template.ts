import * as changeCase from "change-case";

export function getBlocStateTemplate(pageName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(pageName);
  const snakeCaseBlocName = changeCase.snakeCase(pageName);
  return `part of '${snakeCaseBlocName}_bloc.dart';

class ${pascalCaseBlocName}State extends Equatable {
  const ${pascalCaseBlocName}State();
  
  @override
  List<Object> get props => [];
}
`;
}

import * as changeCase from "change-case";

export function getBlocEventTemplate(pageName: string, isBase: boolean): string {
  if (isBase) {
    return getBaseBlocEventTemplate(pageName);
  } else {
    return getDefaultBlocEventTemplate(pageName);
  }
}

export function getDefaultBlocEventTemplate(pageName: string): string {
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


export function getBaseBlocEventTemplate(pageName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(pageName);
  const snakeCaseBlocName = changeCase.snakeCase(pageName);
  return `part of '${snakeCaseBlocName}_bloc.dart';

abstract class ${pascalCaseBlocName}Event extends Equatable {
  const ${pascalCaseBlocName}Event();

  @override
  List<Object> get props => [];
}

class Initialize extends ${pascalCaseBlocName}Event {
  const Initialize();
}
`;
}


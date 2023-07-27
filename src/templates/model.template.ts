import * as changeCase from "change-case";

export function getModelTemplate(modelName: string): string {
  const pascalCaseModelName = changeCase.pascalCase(modelName);
  const snakeCasePageName = changeCase.snakeCase(modelName);

  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snakeCasePageName}.freezed.dart';

part '${snakeCasePageName}.g.dart';

@freezed
class ${pascalCaseModelName} with _$${pascalCaseModelName} {
  factory ${pascalCaseModelName}({
    required String example,
  }) = _${pascalCaseModelName};

  factory ${pascalCaseModelName}.fromJson(Map<String, dynamic> json) =>
      _$${pascalCaseModelName}FromJson(json);
}
`;
}

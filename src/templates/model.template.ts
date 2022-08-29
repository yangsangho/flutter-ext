import * as changeCase from "change-case";

export function getModelTemplate(modelName: string): string {
  const pascalCaseModelName = changeCase.pascalCase(modelName);
  const snakeCasePageName = changeCase.snakeCase(modelName);

  return `import 'package:json_annotation/json_annotation.dart';

part '${snakeCasePageName}.g.dart';

@JsonSerializable()
class ${pascalCaseModelName} {

  factory ${pascalCaseModelName}.fromJson(Map<String, dynamic> json) => _$${pascalCaseModelName}FromJson(json);
  Map<String, dynamic> toJson() => _$${pascalCaseModelName}ToJson(this);
}
`;
}

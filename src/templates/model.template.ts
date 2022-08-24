import * as changeCase from "change-case";

export function getModelTemplate(modelName: string): string {
  const pascalCaseModelName = changeCase.pascalCase(modelName);
  const snakeCasePageName = changeCase.snakeCase(modelName);

  return `import 'package:json_annotation/json_annotation.dart';

import '../../model/json_map.dart';

part '${snakeCasePageName}.g.dart';

@JsonSerializable()
class ${pascalCaseModelName} {

  const ${pascalCaseModelName}();

  factory ${pascalCaseModelName}.fromJson(JsonMap json) => _$${pascalCaseModelName}FromJson(json);
  JsonMap toJson() => _$${pascalCaseModelName}ToJson(this);
}
`;
}

import * as changeCase from "change-case";

export function getModelTemplate(modelName: string): string {
  const pascalCaseModelName = changeCase.pascalCase(modelName);
  const snakeCasePageName = changeCase.snakeCase(modelName);

  return `import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:pawdly_api/src/model/model.dart';

part '${snakeCasePageName}.g.dart';

@JsonSerializable()
class ${pascalCaseModelName} extends Equatable {

  const ${pascalCaseModelName}();

  factory ${pascalCaseModelName}.fromJson(JsonMap json) => _$${pascalCaseModelName}FromJson(json);
  JsonMap toJson() => _$${pascalCaseModelName}ToJson(this);

  @override
  bool? get stringify => true;

  @override
  List<Object?> get props => [];
}
`;
}

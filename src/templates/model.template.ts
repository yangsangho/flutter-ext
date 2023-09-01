export function getModelTemplate(
  snakeModelName: string,
  pascalModelName: string,
): string {

  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${snakeModelName}.freezed.dart';
part '${snakeModelName}.g.dart';

@freezed
class ${pascalModelName} with _$${pascalModelName} {
  const factory ${pascalModelName}({
    required String example,
  }) = _${pascalModelName};

  factory ${pascalModelName}.fromJson(Map<String, dynamic> json) =>
      _$${pascalModelName}FromJson(json);
}
`;
}

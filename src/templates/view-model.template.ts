import * as changeCase from "change-case";

export function getViewModelTemplate(viewModelName: string): string {
  const pascalCaseViewModelName = changeCase.pascalCase(viewModelName);

  return `import 'package:get/get.dart';

class ${pascalCaseViewModelName} extends GetxController { }
`;
}

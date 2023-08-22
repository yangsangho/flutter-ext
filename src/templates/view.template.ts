import * as changeCase from "change-case";

export function getViewTemplate(viewName: string, viewModelName: string): string {
  const pascalCaseViewName = changeCase.pascalCase(viewName);
  const pascalCaseViewModelName = changeCase.pascalCase(viewModelName);
  const snakeCaseViewModelName = changeCase.snakeCase(viewModelName);

  return `import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '${snakeCaseViewModelName}.dart';

class ${pascalCaseViewName} extends GetView<${pascalCaseViewModelName}> {
  const ${pascalCaseViewName}({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
}

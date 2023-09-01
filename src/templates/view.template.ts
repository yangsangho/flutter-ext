export function getViewTemplate(
  snakeViewlName: string,
  pascalViewName: string,
): string {
  const pascalCaseViewName = `${pascalViewName}View`;
  const pascalCaseViewModelName = `${pascalViewName}ViewModel`;
  const snakeCaseViewModelName = `${snakeViewlName}_view_model`;

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

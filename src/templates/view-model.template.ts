export function getViewModelTemplate(
  pascalViewName: string,
): string {
  const pascalCaseViewModelName = `${pascalViewName}ViewModel`;

  return `import 'package:get/get.dart';

class ${pascalCaseViewModelName} extends GetxController { }
`;
}

import * as changeCase from "change-case";

export function getViewViewTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);

  const view = `${pascalCasePageName}View`;

  return `import 'package:flutter/material.dart';

class ${view} extends StatelessWidget {
  const ${view}({super.key});

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
`;
}

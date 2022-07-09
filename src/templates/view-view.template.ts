import * as changeCase from "change-case";

export function getViewViewTemplate(blocName: string): string {
    const pascalCaseBlocName = changeCase.pascalCase(blocName);

    return `import 'package:flutter/material.dart';

class ${pascalCaseBlocName}View extends StatelessWidget {
  const ${pascalCaseBlocName}View({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
`;
}

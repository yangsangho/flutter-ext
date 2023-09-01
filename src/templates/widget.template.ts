export function getWidgetTemplate(
  pascalWidgetName: string,
): string {

  return `import 'package:flutter/material.dart';

class ${pascalWidgetName} extends StatelessWidget {
  const ${pascalWidgetName}({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
}

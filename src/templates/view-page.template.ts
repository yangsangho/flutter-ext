import * as changeCase from "change-case";

export function getViewPageTemplate(blocName: string): string {
    const pascalCaseBlocName = changeCase.pascalCase(blocName);
    const snakeCaseBlocName = changeCase.snakeCase(blocName);

    return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:partners_ui/partners_ui.dart';

import '../${snakeCaseBlocName}.dart';

class ${pascalCaseBlocName}Page extends StatelessWidget {
  const ${pascalCaseBlocName}Page._({Key? key}) : super(key: key);

  static String get _routePath => 'temp';

  static GoRoute get route => GoRoute(
        path: _routePath,
        builder: (context, state) => const ${pascalCaseBlocName}Page._(),
      );

  static String getRoutePath(BuildContext context) =>
    '\${GoRouter.of(context).location}/$_routePath';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ${pascalCaseBlocName}Bloc(),
      child: const Scaffold(
      appBar: TextAppBar(text: 'temp'),
      body: ${pascalCaseBlocName}View(),
      ),
    );
  } 
}
`;
}

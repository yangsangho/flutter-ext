import * as changeCase from "change-case";

export function getViewPageTemplate(pageName: string, isBase: boolean): string {
  if (isBase) {
    return getBaseViewPageTemplate(pageName);
  } else {
    return getDefaultViewPageTemplate(pageName);
  }
}

function getDefaultViewPageTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const page = `${pascalCasePageName}Page`;
  const view = `${pascalCasePageName}View`;
  const bloc = `${pascalCasePageName}Bloc`;

  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:partners_ui/partners_ui.dart';

import '../${snakeCasePageName}.dart';

class ${page} extends StatelessWidget {
  const ${page}._({Key? key}) : super(key: key);

  static String get _routePath => 'temp';

  static GoRoute get route => GoRoute(
        path: _routePath,
        builder: (context, state) => const ${page}._(),
      );

  static String getRoutePath(BuildContext context) =>
    '\${GoRouter.of(context).location}/$_routePath';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ${bloc}(),
      child: const Scaffold(
      appBar: TextAppBar(text: 'temp'),
      body: ${view}(),
      ),
    );
  } 
}
`;
}

function getBaseViewPageTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const page = `${pascalCasePageName}Page`;
  const view = `${pascalCasePageName}View`;
  const bloc = `${pascalCasePageName}Bloc`;
  const blocState = `${pascalCasePageName}State`;
  const blocEvent = `${pascalCasePageName}Event`;

  return `import 'package:common_bloc/common_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:partners_ui/partners_ui.dart';

import '../${snakeCasePageName}.dart';

class ${page} extends StatelessWidget {
  const ${page}._({Key? key}) : super(key: key);

  static String get _routePath => 'temp';

  static GoRoute get route => GoRoute(
        path: _routePath,
        builder: (context, state) => const ${page}._(),
      );

  static String getRoutePath(BuildContext context) =>
    '\${GoRouter.of(context).location}/$_routePath';

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => ${bloc}(),
      child: BlocProgress<${bloc}, ${blocState}, ${blocEvent}>(
        builder: (context) => const Scaffold(
          appBar: TextAppBar(text: 'temp'),
          body: ${view}(),
        ),
      ),
    );
  } 
}
`;
}
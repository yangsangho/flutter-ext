import * as changeCase from "change-case";

export function getBlocTemplate(pageName: string, isBase: boolean): string {
  if (isBase) {
    return getBaseBlocTemplate(pageName);
  } else {
    return getDefaultBlocTemplate(pageName);
  }
}

function getDefaultBlocTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const bloc = `${pascalCasePageName}Bloc`;
  const blocState = `${pascalCasePageName}State`;
  const blocEvent = `${pascalCasePageName}Event`;

  return `import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

part '${snakeCasePageName}_event.dart';
part '${snakeCasePageName}_state.dart';

typedef ${pascalCasePageName}Emit = Emitter<${blocState}>;

class ${bloc} extends Bloc<${blocEvent}, ${blocState}> {
  ${bloc}() : super(const ${blocState}()) {
    on<${blocEvent}>((event, emit) {});
  }
}
`;
}

function getBaseBlocTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const bloc = `${pascalCasePageName}Bloc`;
  const blocState = `${pascalCasePageName}State`;
  const blocEvent = `${pascalCasePageName}Event`;

  return `import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:pawdly_util/pawdly_util.dart';

part '${snakeCasePageName}_event.dart';
part '${snakeCasePageName}_state.dart';

typedef ${pascalCasePageName}Emit = Emitter<${blocState}>;

class ${bloc} extends BaseBloc<${blocEvent}, ${blocState}> {
  ${bloc}()
      : super(
        const ${blocState}(),
        requiredInitializeEventTypeList: [],
      ) {
    on<Initialize>(_initialize);
  }

  void _initialize(Initialize event, ${pascalCasePageName}Emit emit) {}
}
`;
}
import * as changeCase from "change-case";

export function getBlocStateTemplate(pageName: string, isBase: boolean): string {
  if (isBase) {
    return getBaseBlocStateTemplate(pageName);
  } else {
    return getDefaultBlocStateTemplate(pageName);
  }
}

function getDefaultBlocStateTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const blocState = `${pascalCasePageName}State`;

  return `part of '${snakeCasePageName}_bloc.dart';

class ${blocState} extends Equatable {
  const ${blocState}();
  
  @override
  List<Object?> get props => [];
}
`;
}

function getBaseBlocStateTemplate(pageName: string): string {
  const pascalCasePageName = changeCase.pascalCase(pageName);
  const snakeCasePageName = changeCase.snakeCase(pageName);

  const blocState = `${pascalCasePageName}State`;

  return `part of '${snakeCasePageName}_bloc.dart';

class ${blocState} extends BaseState {
  const ${blocState}({
    PageStatus pageStatus = PageStatus.notInitialized,
  }) : super(pageStatus: pageStatus);
  
  @override
  List<Object?> get props => super.props..addAll([]);

  ${blocState} copyWith({
    PageStatus? pageStatus,
  }) {
    return ${blocState}(
      pageStatus: pageStatus ?? this.pageStatus,
    );
  }

  @override
  BaseState pageStatusCopyWith(PageStatus pageStatus) =>
      copyWith(pageStatus: pageStatus);
}
`;
}

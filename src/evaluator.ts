import Platform from './enums/platform';
import Checker from './checker';
import ExecutableExtractor from './extractor/executable';
import BaseExtractor from './extractor/base';

export interface EvaluatorOptions {}

export enum EvaluatorStatus {
  Ok,
  Warning,
  Error,
  Fail
}

export interface EvaluatorResult {
  status: EvaluatorStatus;
}

export class Evaluator {
  constructor(opts: EvaluatorOptions) {}
  public async evaluate(): Promise<EvaluatorResult> {
    let c = new Checker({
      name: 'try',
      matcher: { semver: { range: '>= 1.0.0' } }
    });

    let e = new ExecutableExtractor({
      name: 'openssl',
      command: 'openssl version',
      platforms: [Platform.Win32, Platform.Posix]
    });

    let result = c.isOk(BaseExtractor.brand('1.9.1'));
    if (result) {
      return { status: EvaluatorStatus.Ok };
    }
    return { status: EvaluatorStatus.Error };
  }
}

export default Evaluator;

import Platform from './enums/platform';
import ExecutableExtractor from './extractor/executable';
import BaseExtractor from './extractor/base';
import { ProjectConfig } from './project/config';
import { indentError } from './utils/format-error';
import Environment from './environment';
import { ExtractorRegistry } from './extractor/registry';
import { ValueMatcher } from './checker';

export interface EvaluatorOptions {
  config: ProjectConfig;
  env: Environment;
  registry: ExtractorRegistry;
}

export enum EvaluatorStatus {
  Ok,
  Warning,
  Error,
  Fail
}

export interface EvaluatorResult {
  name: string;
  message: string;
  found: string;
  target: ValueMatcher;
  status: EvaluatorStatus;
}

export class Evaluator {
  protected config: ProjectConfig;
  protected env: Environment;
  protected registry: ExtractorRegistry;
  constructor(opts: EvaluatorOptions) {
    this.config = opts.config;
    this.registry = opts.registry;
    this.env = opts.env;
  }

  public async processVerifications(): Promise<EvaluatorResult[]> {
    let { verify } = this.config.options;
    let i = 0;
    let results = await Promise.all(
      verify.map(async v => {
        i++;
        let { name } = v;
        let ex = this.registry.getExtractor(name);
        if (ex === null)
          throw new Error(
            `Found item in "root.verify[${i}]" pertaining to unknown extractor: ${name}`
          );
        let extractorResult = await ex.getInfo(this.env, v);
        return extractorResult;
      })
    );
    return results.map(r => {
      return {
        name: r.name,
        message: `${r.cmd} ${r.normalized} ${
          r.match ? 'is OK    ' : 'is NOT OK'
        }`,
        found: r.normalized,
        target: r.target,
        status: r.match ? EvaluatorStatus.Ok : EvaluatorStatus.Fail
      };
    });
  }
}

export default Evaluator;

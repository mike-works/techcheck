import Evaluator, { EvaluatorStatus } from './evaluator';
import 'es6-promise/auto';
import chalk from 'chalk';
import { ProjectConfig } from './project/config';
import { indentError } from './utils/format-error';
import { ExtractorRegistry } from './extractor/registry';
import Environment from './environment';
import { formatExtractorResults } from './formatter';

async function coreSetup(): Promise<{ registry: ExtractorRegistry }> {
  let registry = new ExtractorRegistry();
  try {
    await registry.setup();
    return { registry };
  } catch (e) {
    let err = e as Error;
    err.message = indentError(
      'Unable to setup extractor registry',
      '  ',
      err.message
    );
    throw err;
  }
}

async function projectSetup(): Promise<{
  config: ProjectConfig;
}> {
  let config = new ProjectConfig();
  try {
    await config.setup();
  } catch (e) {
    if (e instanceof Error) {
      e.message = indentError(
        'Unable to setup project config',
        '  ',
        e.message
      );
      throw e;
    } else {
      throw e;
    }
  }
  return { config };
}

async function main(): Promise<boolean> {
  let env = new Environment();
  let { registry } = await coreSetup();
  let { config } = await projectSetup();

  let evaluator = new Evaluator({ env, registry, config });
  let verificationResult = await evaluator.processVerifications();
  formatExtractorResults(process.stdout, verificationResult);
  let success = verificationResult.reduce((acc, item) => {
    if (!acc) return acc;
    return (
      [EvaluatorStatus.Ok, EvaluatorStatus.Warning].indexOf(item.status) >= 0
    );
  }, true);
  return success;
  // console.log(verificationResult);
}

(async function() {
  let ok = await main();
  process.exit(ok ? 0 : 1);
})().catch(e => {
  if (e instanceof Error) {
    let message: string = `${e}`;
    if (e instanceof Error && e.stack) {
      message = e.stack;
    }
    message = message
      .split('\n')
      .map(x => chalk.red(x))
      .join('\n');
    console.error(chalk.red(message));
  }
});

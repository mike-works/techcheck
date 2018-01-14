import * as chalk from 'chalk';
import { ExtractorResult } from './extractor/base';
import { EvaluatorResult, EvaluatorStatus } from './evaluator';
import { ValueMatcher } from './checker';

function successMessage(s: NodeJS.WritableStream, r: EvaluatorResult) {
  let str = `  ✅  ${r.name}\t${r.message}`;
  str += chalk.grey(`\t(required: ${formatMatcher(r.target)} )`);
  s.write(str + '\n');
}

function failMessage(s: NodeJS.WritableStream, r: EvaluatorResult) {
  let str = `  🛑  ${r.name}\t${r.message}`;
  str += chalk.grey(`\t(required: ${formatMatcher(r.target)} )`);
  s.write(str + '\n');
}

function warnMessage(s: NodeJS.WritableStream, r: EvaluatorResult) {
  s.write(`  ⚠️  ${r.name}\n`);
}

function errorMessage(s: NodeJS.WritableStream, r: EvaluatorResult) {
  s.write(`  💥  ${r.name}\n`);
}

export function formatExtractorResults(
  s: NodeJS.WritableStream,
  results: EvaluatorResult[]
) {
  s.write(
    '\n' +
      chalk.yellow("🔍 TechCheck Scan: Making sure you're all set up 🔎") +
      '\n'
  );
  s.write(' ------------------------------------------------\n');
  results.forEach(r => {
    if (r.status === EvaluatorStatus.Ok) successMessage(s, r);
    if (r.status === EvaluatorStatus.Error) errorMessage(s, r);
    if (r.status === EvaluatorStatus.Warning) warnMessage(s, r);
    if (r.status === EvaluatorStatus.Fail) failMessage(s, r);
  });
}

function formatMatcher(valueMatcher: ValueMatcher) {
  if (typeof valueMatcher === 'string') {
    return '= ' + chalk.yellow(`"${valueMatcher}"`);
  }
  if (valueMatcher instanceof RegExp) {
    return '~ ' + chalk.magenta(`/${valueMatcher.source}/`);
  }
  if (valueMatcher instanceof Function) {
    return chalk.cyan(`${valueMatcher.toString()}`);
  }
  if (valueMatcher.semver) {
    let sv = valueMatcher.semver;
    if (typeof sv === 'string') {
      return chalk.green(`${sv}`);
    }
    if (sv.range) {
      return chalk.green(`${sv.range}`);
    }
    if (sv.min && sv.max) {
      return chalk.green(`>= ${sv.min} && <= ${sv.max}`);
    }
    if (sv.min) {
      return chalk.green(`>= ${sv.min}`);
    }
    if (sv.max) {
      return chalk.green(`<= ${sv.max}`);
    }
  }
}

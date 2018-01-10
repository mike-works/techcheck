import * as semver from 'semver';
import { ExtractorValue, BaseExtractor } from './extractor/base';

export type ValueFormatter = RegExp | ((raw: string) => string);
export type SemVerMatcher = { range?: string; min?: string; max?: string };

export type ValueMatcher =
  | RegExp
  | string
  | { semver: SemVerMatcher }
  | ((raw: string) => boolean);

export interface BaseCheckerOptions {
  preprocessor?: ValueFormatter;
  matcher: ValueMatcher;
  name: string;
}

function normalizeExtractorValue(
  v: ExtractorValue,
  adj: ValueFormatter
): string {
  if (adj instanceof RegExp) {
    let parts = adj.exec(BaseExtractor.unbrand(v));
    if (parts === null || parts.length === 0)
      throw new Error(`Could not normalize value ${v} with ${adj}`);
    return parts[0];
  }
  return adj(BaseExtractor.unbrand(v));
}

function doesSemverMatch(version: string, m: SemVerMatcher): boolean {
  let { range, min, max } = m;
  if (typeof range !== 'undefined') {
    return semver.satisfies(version, range);
  }
  if (typeof max !== 'undefined') {
    if (typeof min !== 'undefined') {
      return semver.gte(version, min) && semver.lte(version, max);
    }
    return semver.lte(version, max);
  }
  if (typeof min !== 'undefined') {
    return semver.gte(version, min);
  }
  throw new Error(`Invalid SemVerMatcher object ${JSON.stringify(m)}`);
}

function doesMatch(v: ExtractorValue | string, m: ValueMatcher): boolean {
  let val = typeof v === 'string' ? v : BaseExtractor.unbrand(v);
  if (m instanceof RegExp) {
    return m.test(val);
  }
  if (typeof m === 'string') {
    return m === val;
  }
  if (m instanceof Function) {
    return m(val);
  }
  return doesSemverMatch(val, m.semver);
}

function validateOptions(opts: BaseCheckerOptions) {
  if (
    !(opts.matcher instanceof RegExp) &&
    !(opts.matcher instanceof Function) &&
    typeof opts.matcher !== 'string'
  ) {
    opts.matcher.semver;
  }
}

export class BaseChecker {
  protected preprocessor?: ValueFormatter;
  protected matcher?: ValueMatcher;
  public readonly name: string;
  constructor(opts: BaseCheckerOptions) {
    validateOptions(opts);
    this.preprocessor = opts.preprocessor;
    this.matcher = opts.matcher;
    this.name = opts.name;
  }
  public async isOk(v: ExtractorValue): Promise<boolean> {
    let normalized =
      typeof this.preprocessor !== 'undefined'
        ? normalizeExtractorValue(v, this.preprocessor)
        : v;
    if (typeof this.matcher === 'undefined')
      throw new Error(`Checker ${this.name} does not have a matcher`);
    let matches = doesMatch(normalized, this.matcher);
    return matches;
  }
}

export default BaseChecker;

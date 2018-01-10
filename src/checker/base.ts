import * as semver from 'semver';

export type ValueAdjuster = RegExp | ((raw: string) => string);
export type SemVerMatcher = { range?: string; min?: string; max?: string };
export type ValueMatcher =
  | RegExp
  | string
  | { semver: SemVerMatcher }
  | ((raw: string) => boolean);
export type ExtractorValue = string;

export interface BaseCheckerOptions {
  preprocessor?: ValueAdjuster;
  matcher: ValueMatcher;
  name: string;
}

function normalizeExtractorValue(
  v: ExtractorValue,
  adj: ValueAdjuster
): ExtractorValue {
  if (adj instanceof RegExp) {
    let parts = adj.exec(v);
    if (parts === null || parts.length === 0)
      throw new Error(`Could not normalize value ${v} with ${adj}`);
    return parts[0];
  }
  return adj(v);
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

function doesMatch(v: ExtractorValue, m: ValueMatcher) {
  if (m instanceof RegExp) {
    return m.test(v);
  }
  if (typeof m === 'string') {
    return m === v;
  }
  if (m instanceof Function) {
    return m(v);
  }
  return doesSemverMatch(v, m.semver);
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
  protected preprocessor?: ValueAdjuster;
  protected matcher?: ValueMatcher;
  public readonly name: string;
  constructor(opts: BaseCheckerOptions) {
    validateOptions(opts);
    this.preprocessor = opts.preprocessor;
    this.matcher = opts.matcher;
    this.name = opts.name;
  }
  public isOk(v: ExtractorValue) {
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

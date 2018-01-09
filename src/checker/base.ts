import { satisfies } from 'semver';

export type ValueAdjuster = RegExp | ((raw: string) => string);
export type ValueMatcher = RegExp | string | { semverRange: string } | ((raw: string) => boolean);
export type ExtractorValue = string;

export interface BaseCheckerOptions {
  preprocessor?: ValueAdjuster;
  matcher: ValueMatcher;
  name: string;
}

function normalizeExtractorValue(v: ExtractorValue, adj: ValueAdjuster): ExtractorValue {
  if (adj instanceof RegExp) {
    let parts = adj.exec(v);
    if (parts === null || parts.length === 0) throw new Error(`Could not normalize value ${v} with ${adj}`);
    return parts[0];
  }
  return adj(v);
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
  return satisfies(v, m.semverRange);
}

export class BaseChecker {
  protected preprocessor?: ValueAdjuster;
  protected matcher?: ValueMatcher;
  public readonly name: string;
  constructor(opts: BaseCheckerOptions) {
    this.preprocessor = opts.preprocessor;
    this.matcher = opts.matcher;
    this.name = opts.name;
  }
  public isOk(v: ExtractorValue) {
    let normalized = typeof this.preprocessor !== 'undefined' ? normalizeExtractorValue(v, this.preprocessor) : v;
    if (typeof this.matcher === 'undefined') throw new Error(`Checker ${this.name} does not have a matcher`);
    let matches = doesMatch(normalized, this.matcher);
    return matches;
  }
}

export default BaseChecker;

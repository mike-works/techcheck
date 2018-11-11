import { validRange, satisfies, gte, lte } from 'semver';

export type SemVerMatcher =
  | { range?: string; min?: string; max?: string }
  | string;

export type ValueMatcher =
  | RegExp
  | string
  | { semver: SemVerMatcher }
  | ((raw: string) => boolean);

function doesSemverMatch(version: string, m: SemVerMatcher): boolean {
  let range = typeof m !== 'string' ? m.range : m;
  let min: string | undefined;
  let max: string | undefined;
  if (typeof m !== 'string') {
    min = m.min;
    max = m.max;
  }

  if (typeof range !== 'undefined') {
    return satisfies(version, range);
  }
  if (typeof max !== 'undefined') {
    if (typeof min !== 'undefined') {
      return gte(version, min) && lte(version, max);
    }
    return lte(version, max);
  }
  if (typeof min !== 'undefined') {
    return gte(version, min);
  }
  throw new Error(`Invalid SemVerMatcher object ${JSON.stringify(m)}`);
}

function doesMatch(v: string | string, m: ValueMatcher): boolean {
  let val = v;
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

function validateMatcher(matcher: ValueMatcher) {
  if (matcher instanceof RegExp) return true;
  if (matcher instanceof Function) return true;
  if (typeof matcher === 'string') return true;
  if (
    typeof matcher.semver !== 'undefined' &&
    ((typeof matcher.semver === 'string' &&
      validRange(matcher.semver) !== undefined) ||
      (typeof matcher.semver !== 'string' &&
        (typeof matcher.semver.max !== 'undefined' ||
          typeof matcher.semver.min !== 'undefined' ||
          typeof matcher.semver.range !== 'undefined')))
  ) {
    return true;
  }
  return false;
}

export function isOk(v: string, matcher: ValueMatcher): boolean {
  try {
    if (typeof matcher === 'undefined' || !validateMatcher(matcher)) {
      throw new Error(`Invalid matcher: ${JSON.stringify(matcher)}`);
    }
    let matches = doesMatch(v, matcher);
    return matches;
  } catch (e) {
    console.warn(`Problem evaluating version ${v} to match ${matcher}\n${e}`);
    return false;
  }
}

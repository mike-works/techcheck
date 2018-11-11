import { checkObjectKeys } from '../utils/compare';
import { indentError } from '../utils/format-error';
import { validRange } from 'semver';

interface TypeErrorMessage {
  path: string;
  message: string;
}

function validateVerifyItem(dep: any, i: number): TypeErrorMessage[] {
  if (typeof dep.name !== 'string') {
    return [{ path: `root.verify[${i}].name`, message: 'should be a string' }];
  }
  if (dep.version instanceof RegExp) return [];
  if (dep.version instanceof Function) return [];
  if (typeof dep.version === 'string') return [];
  if (dep.version instanceof Array) {
    return [
      { path: `root.verify[${i}].version`, message: 'should be an array' }
    ];
  }
  if (dep.version instanceof Object) {
    let o = dep.version as Object;
    if (typeof (o as any).semver === 'string') {
      if (validRange((o as any).semver)) return [];
      return [
        {
          path: `root.verify[${i}].version.semver`,
          message: `invalid semver string: ${(o as any).semver}`
        }
      ];
    }
    if (
      dep.version.semver &&
      (dep.version.semver.min ||
        dep.version.semver.max ||
        dep.version.semver.range)
    ) {
      return [];
    }
    return [
      {
        path: `root.verify[${i}].version`,
        message: `invalid object ${JSON.stringify(dep.version)}`
      }
    ];
  }
  return [];
}

function validateVerifyArray(verifyArr: any[]): TypeErrorMessage[] {
  if (!(verifyArr instanceof Array)) {
    return [{ path: 'root.verify', message: 'should be an array' }];
  }

  for (let i = 0; i < verifyArr.length; i++) {
    let dep = verifyArr[i];
    let errors = validateVerifyItem(dep, i);
    if (errors.length > 0) return errors;
  }
  return [];
}
export function validateConfig(configModule: any): TypeErrorMessage[] {
  if (!(configModule.verify instanceof Object)) {
    return [{ path: 'root', message: 'should be an object' }];
  }
  let verifyErrors = validateVerifyArray(configModule.verify);
  if (verifyErrors.length > 0) return verifyErrors;
  return [];
}

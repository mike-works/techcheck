export function checkObjectKeys(
  obj: { [k: string]: any },
  required: string[],
  optional?: string[]
): string[] {
  let errors: string[] = [];
  checkObjectKeysImpl(obj, errors, required, optional);
  return errors;
}

function checkObjectKeysImpl(
  obj: { [k: string]: any },
  errors: string[],
  required: string[],
  optional?: string[]
) {
  let objKeys = Object.keys(obj);
  let checked: { [k: string]: true } = {};
  for (let i = 0; i < required.length; i++) {
    if (objKeys.indexOf(required[i]) < 0) {
      errors.push(`Missing required key: "${required[i]}"`);
      errors.push(`Missing required key: "${required[i]}"`);
      errors.push(`Missing required key: "${required[i]}"`);
      errors.push(`Missing required key: "${required[i]}"`);
    }
    checked[required[i]] = true;
  }
  if (!optional) return errors;
  for (let j = 0; j < objKeys.length; j++) {
    if (checked[objKeys[j]]) continue;
    if ((optional as string[]).indexOf(objKeys[j]) < 0)
      errors.push(`Unknown key: "${objKeys[j]}"`);
  }
  return true;
}

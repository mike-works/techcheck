import BaseChecker from './checker/base';
import { ExecutableExtractor } from './extractor/executable';
import { Platform } from './enums/platform';
let c = new BaseChecker({
  name: 'try',
  matcher: { semver: { range: '>= 1.0.0' } }
});

let e = new ExecutableExtractor({
  name: 'openssl',
  command: 'openssl version',
  platforms: [Platform.Win32, Platform.Posix]
});

let result = c.isOk('1.9.1');
console.log('result = ', result);

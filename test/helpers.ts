import Environment from '../src/environment';
import { Platform } from '../src/enums/platform';
import * as chaiAsPromised from 'chai-as-promised';
import { use } from 'chai';

use(chaiAsPromised);

export const posixEnvironment = new Environment({
  platform: Platform.Posix
});

export const winEnvironment = new Environment({
  platform: Platform.Win32
});

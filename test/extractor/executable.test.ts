import { expect } from 'chai';
import ExecutableExtractor from '../../src/extractor/executable';
import Environment from '../../src/environment';
import { Platform } from '../../src/enums/platform';
import { posixEnvironment } from '../helpers';
import * as semver from 'semver';
import { BaseExtractor } from '../../src/extractor/base';

describe('ExecutableExtractor', () => {
  it('should determine the version of node correctly', async () => {
    let nodeExtractor = new ExecutableExtractor({
      name: 'node',
      platforms: [Platform.Win32, Platform.Posix],
      commands: { version: 'node -v' }
    });
    let info = await nodeExtractor.getInfo(posixEnvironment, {
      version: { semver: { min: '0.0.0' } }
    });
    expect(info.normalized).to.equal(`v${process.versions.node}`);
  });

  it('should throw if command does not exist', async () => {
    let dumbExtractor = new ExecutableExtractor({
      name: 'dumb',
      platforms: [Platform.Win32, Platform.Posix],
      commands: { version: 'derpp! -v' }
    });
    await expect(
      dumbExtractor.getInfo(posixEnvironment, { cmd: 'version' })
    ).to.be.rejectedWith();
  });
});

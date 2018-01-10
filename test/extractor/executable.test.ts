import { expect } from 'chai';
import ExecutableExtractor from '../../src/extractor/executable';
import Environment from '../../src/environment';
import { Platform } from '../../src/enums/platform';
import { posixEnvironment } from '../helpers';
import * as semver from 'semver';

let nodeExtractor = new ExecutableExtractor({
  name: 'node',
  platforms: [Platform.Win32, Platform.Posix],
  command: 'node -v'
});

describe('ExecutableExtractor', () => {
  it('should determine the version of node correctly', async () => {
    let info = await nodeExtractor.getInfo(posixEnvironment);
    expect(info).to.equal(`v${process.versions.node}`);
  });
});

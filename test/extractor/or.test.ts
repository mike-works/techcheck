import { expect } from 'chai';
import OrExtractor from '../../src/extractor/or';
import ExecutableExtractor from '../../src/extractor/executable';
import Environment from '../../src/environment';
import { Platform } from '../../src/enums/platform';
import { posixEnvironment, winEnvironment } from '../helpers';
import { BaseExtractor } from '../../src/extractor/base';

describe('OrExtractor', () => {
  it('should choose between commands for two environments correctly', async () => {
    let git = new ExecutableExtractor({
      name: 'git',
      platforms: [Platform.Win32],
      commands: { version: 'git --version' },
      normalizerOptions: {
        preprocessor: /[0-9\.]+/
      }
    });
    let comboExtractor = new OrExtractor({
      extractors: [
        git,
        new ExecutableExtractor({
          name: 'node',
          platforms: [Platform.Posix],
          commands: { version: 'node -v' }
        })
      ]
    });
    let info = {
      posix: (await comboExtractor.getInfo(posixEnvironment, {
        version: { semver: { min: '0.0.0' } }
      })).normalized,
      win: (await comboExtractor.getInfo(winEnvironment, {
        version: { semver: { min: '0.0.0' } }
      })).normalized
    };
    expect(info.posix).to.equal(`v${process.versions.node}`);

    expect(info.win).to.equal(
      (await git.getInfo(winEnvironment, {
        version: { semver: { min: '0.0.0' } }
      })).normalized
    );
  });

  it('should throw if an overlap in environments exists', async () => {
    let git = new ExecutableExtractor({
      name: 'git',
      platforms: [Platform.Win32],
      commands: { version: 'git --version' }
    });
    expect(
      () =>
        new OrExtractor({
          extractors: [
            git,
            new ExecutableExtractor({
              name: 'node',
              platforms: [Platform.Win32],
              commands: { version: 'node -v' }
            })
          ]
        })
    ).to.throw('Platform overlap');
  });
});

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
      command: 'git --version'
    });
    let comboExtractor = new OrExtractor({
      extractors: [
        git,
        new ExecutableExtractor({
          name: 'node',
          platforms: [Platform.Posix],
          command: 'node -v'
        })
      ]
    });
    let info = {
      posix: BaseExtractor.unbrand(
        await comboExtractor.getInfo(posixEnvironment)
      ),
      win: BaseExtractor.unbrand(await comboExtractor.getInfo(winEnvironment))
    };
    expect(info.posix).to.equal(`v${process.versions.node}`);
    expect(info.win).to.equal(
      BaseExtractor.unbrand(await git.getInfo(winEnvironment))
    );
  });

  it('should throw if an overlap in environments exists', async () => {
    let git = new ExecutableExtractor({
      name: 'git',
      platforms: [Platform.Win32],
      command: 'git --version'
    });
    expect(
      () =>
        new OrExtractor({
          extractors: [
            git,
            new ExecutableExtractor({
              name: 'node',
              platforms: [Platform.Win32],
              command: 'node -v'
            })
          ]
        })
    ).to.throw('Platform overlap');
  });
});

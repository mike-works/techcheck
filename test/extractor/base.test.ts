import { expect } from 'chai';
import BaseExtractor, { ExtractorValue } from '../../src/extractor/base';
import Environment from '../../src/environment';
import { Platform } from '../../src/enums/platform';
import { posixEnvironment } from '../helpers';

class TestExtractor extends BaseExtractor {
  protected async getInfoForEnvironment(
    env: Environment,
    opts: {}
  ): Promise<ExtractorValue> {
    return BaseExtractor.brand('infooo');
  }
}

describe('BaseExtractor', () => {
  it('should throw if run on a platform it does not support', async () => {
    let ex = new TestExtractor({ name: 'test', platforms: [Platform.Win32] });
    await expect(ex.getInfo(posixEnvironment)).to.be.rejectedWith(
      'does not support'
    );
  });

  it('should operate without throwing on platforms it does support', async () => {
    let ex = new TestExtractor({ name: 'test', platforms: [Platform.Posix] });
    let info = BaseExtractor.unbrand(await ex.getInfo(posixEnvironment));
    expect(info).to.equal('infooo');
  });

  it('should properly indicate which platforms it handles', async () => {
    let ex = new TestExtractor({ name: 'test', platforms: [Platform.Posix] });
    expect(ex.handlesPlatform(Platform.Posix), 'posix').to.be.true;
    expect(ex.handlesPlatform(Platform.Win32), 'windows').to.be.false;
    expect(ex.handlesPlatform(Platform.Unsupported), 'unsupported').to.be.false;
  });

  it('should know its name', async () => {
    let ex = new TestExtractor({ name: 'grapes', platforms: [Platform.Posix] });
    expect(ex.name).to.equal('grapes');
  });
});

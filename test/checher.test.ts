import { expect } from 'chai';
import Checker from '../src/checker';
import { BaseExtractor } from '../src/extractor/base';

describe('Checker', () => {
  it('exact string match matcher', async () => {
    let c = new Checker({ name: 'test', matcher: 'foo' });
    await expect(c.isOk(BaseExtractor.brand('foo'))).to.eventually.be.ok;
  });

  it('regex match matcher', async () => {
    let c = new Checker({ name: 'test', matcher: /epta/ });
    await expect(c.isOk(BaseExtractor.brand('Heptapod'))).to.eventually.be.ok;
    await expect(c.isOk(BaseExtractor.brand('Septa'))).to.eventually.be.ok;
  });

  it('function matcher', async () => {
    let c = new Checker({ name: 'test', matcher: s => s.indexOf('L') === 0 });
    await expect(c.isOk(BaseExtractor.brand('Luke'))).to.eventually.be.ok;
    await expect(c.isOk(BaseExtractor.brand('Leia'))).to.eventually.be.ok;
  });

  it('semver range matcher', async () => {
    let c = new Checker({
      name: 'test',
      matcher: { semver: { range: '1.x || >=2.5.0 || 5.0.0 - 7.2.3' } }
    });
    await expect(c.isOk(BaseExtractor.brand('1.2.1')), '1.2.1').to.eventually.be
      .true;
    await expect(c.isOk(BaseExtractor.brand('6.0.0')), '6.0.0').to.eventually.be
      .true;
    await expect(c.isOk(BaseExtractor.brand('2.0.0')), '2.0.0').to.eventually.be
      .false;
  });

  it('semver min matcher', async () => {
    let c = new Checker({
      name: 'test',
      matcher: { semver: { min: '1.2.0' } }
    });
    await expect(c.isOk(BaseExtractor.brand('1.2.1')), '1.2.1').to.eventually.be
      .true;
    await expect(c.isOk(BaseExtractor.brand('1.0.0')), '1.0.0').to.eventually.be
      .false;
  });

  it('semver min matcher', async () => {
    let c = new Checker({
      name: 'test',
      matcher: { semver: { max: '1.2.0' } }
    });
    await expect(c.isOk(BaseExtractor.brand('1.1.1')), '1.1.1').to.eventually.be
      .true;
    await expect(c.isOk(BaseExtractor.brand('2.0.0')), '2.0.0').to.eventually.be
      .false;
  });

  it('semver min/max matcher', async () => {
    let c = new Checker({
      name: 'test',
      matcher: { semver: { min: '1.2.0', max: '2.2.4' } }
    });
    await expect(c.isOk(BaseExtractor.brand('1.2.1')), '1.2.1').to.eventually.be
      .true;
    await expect(c.isOk(BaseExtractor.brand('1.2.1-beta.1')), '1.2.1-beta.1').to
      .eventually.be.true;
    await expect(c.isOk(BaseExtractor.brand('6.0.0')), '6.0.0').to.eventually.be
      .false;
    await expect(c.isOk(BaseExtractor.brand('2.0.0')), '2.0.0').to.eventually.be
      .true;
  });
});

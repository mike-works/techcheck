import { expect } from 'chai';
import { isOk } from '../src/checker';
import { BaseExtractor } from '../src/extractor/base';

describe('Checker', () => {
  it('exact string match matcher', async () => {
    await expect(isOk('foo', 'foo')).to.be.true;
  });

  it('regex match matcher', async () => {
    await expect(isOk('Heptapod', /epta/)).to.be.ok;
    await expect(isOk('Septa', /epta/)).to.be.ok;
  });

  it('function matcher', async () => {
    await expect(isOk('Luke', s => s.indexOf('L') === 0)).to.be.ok;
    await expect(isOk('Leia', s => s.indexOf('L') === 0)).to.be.ok;
  });

  it('semver range matcher', async () => {
    let m = { semver: { range: '1.x || >=2.5.0 || 5.0.0 - 7.2.3' } };
    await expect(isOk('1.2.1', m), '1.2.1').to.be.true;
    await expect(isOk('6.0.0', m), '6.0.0').to.be.true;
    await expect(isOk('2.0.0', m), '2.0.0').to.be.false;
  });

  it('semver min matcher', async () => {
    let m = { semver: { min: '1.2.0' } };
    await expect(isOk('1.2.1', m), '1.2.1').to.be.true;
    await expect(isOk('1.0.0', m), '1.0.0').to.be.false;
  });

  it('semver min matcher', async () => {
    let m = { semver: { max: '1.2.0' } };
    await expect(isOk('1.1.1', m), '1.1.1').to.be.true;
    await expect(isOk('2.0.0', m), '2.0.0').to.be.false;
  });

  it('semver min/max matcher', async () => {
    let m = { semver: { min: '1.2.0', max: '2.2.4' } };
    await expect(isOk('1.2.1', m), '1.2.1').to.be.true;
    await expect(isOk('1.2.1-beta.1', m), '1.2.1-beta.1').to.be.true;
    await expect(isOk('6.0.0', m), '6.0.0').to.be.false;
    await expect(isOk('2.0.0', m), '2.0.0').to.be.true;
  });
});

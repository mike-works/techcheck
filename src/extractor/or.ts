import BaseExtractor from './base';
import { Platform, SupportedPlatform } from '../enums/platform';
import Environment from '../environment';

export default class OrExtractor extends BaseExtractor {
  private extractors: BaseExtractor[];
  public getInfoForEnvironment(env: Environment, opts: {}): Promise<string> {
    for (let i = 0; i < this.extractors.length; i++) {
      if (this.extractors[i].handlesPlatform(env.platform)) {
        return this.extractors[i].getInfo(env, opts);
      }
    }
    throw new Error(
      `No extractor found for platform ${Platform[env.platform]}`
    );
  }
  constructor({ extractors }: { extractors: BaseExtractor[] }) {
    let platforms = extractors
      .map(e => e.platforms)
      .reduce((arr, thisPlatforms) => {
        let toAdd: SupportedPlatform[] = [];
        thisPlatforms.forEach(p => {
          if (arr.indexOf(p) < 0 && toAdd.indexOf(p) < 0) {
            toAdd.push(p);
          }
        });
        return arr.concat(toAdd);
      }, []);
    super({
      platforms,
      name: `Or (${extractors.map(e => e.name).join(', ')})`
    });
    this.extractors = extractors;
  }
}
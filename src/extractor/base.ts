import { Platform, SupportedPlatform } from '../enums/platform';
import Environment from '../environment';

export type ExtractorValue = {
  _brand: '__from_extractor';
  val: string;
};

export interface BaseExtractorOptions {
  name: string;
  platforms: SupportedPlatform[];
}

export abstract class BaseExtractor<Opts = {}> {
  public readonly platforms: SupportedPlatform[];
  public readonly name: string;
  public handlesPlatform(platform: Platform) {
    return (this.platforms as Platform[]).indexOf(platform) >= 0;
  }
  public async getInfo(env: Environment, opts?: Opts): Promise<ExtractorValue> {
    if (!this.handlesPlatform(env.platform))
      throw new Error(
        `Extractor ${this.name} does not support ${Platform[env.platform]}`
      );
    return this.getInfoForEnvironment(env, opts);
  }
  protected abstract async getInfoForEnvironment(
    env: Environment,
    opts?: Opts
  ): Promise<ExtractorValue>;
  constructor({ name, platforms }: BaseExtractorOptions) {
    this.platforms = platforms;
    this.name = name;
  }
  protected static brandStamp: '__from_extractor';
  public static unbrand(v: ExtractorValue): string {
    return v.val;
  }
  public static brand(s: string): ExtractorValue {
    return {
      val: s,
      _brand: BaseExtractor.brandStamp
    };
  }
}

export default BaseExtractor;

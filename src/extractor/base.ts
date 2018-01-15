import { Platform, SupportedPlatform } from '../enums/platform';
import Environment from '../environment';
import { ValueMatcher, isOk } from '../checker';

export type ExtractorValue = {
  _brand: '__from_extractor';
  val: string;
};

export interface ExtractorResult {
  name: string;
  raw: string;
  cmd: string;
  normalized: string;
  target: ValueMatcher;
  match: boolean;
}

type ValueFormatter = RegExp | ((s: string) => string);

export interface NormalizerOptions {
  preprocessor?: ValueFormatter;
}

export interface BaseExtractorOptions {
  name: string;
  platforms: SupportedPlatform[];
  normalizerOptions?: NormalizerOptions;
}

function normalizeValue(s: string, no?: NormalizerOptions): string {
  if (!no) return s;
  let vf = no.preprocessor;
  if (typeof vf === 'undefined') return s;
  if (vf instanceof RegExp) {
    let parts = vf.exec(s);
    if (parts && parts.length > 0) {
      return parts[1] || parts[0];
    }
    return '';
  }
  return vf(s);
}

export abstract class BaseExtractor {
  public readonly platforms: SupportedPlatform[];
  public readonly name: string;
  private normalizerOptions?: NormalizerOptions;

  public handlesPlatform(platform: Platform) {
    return (this.platforms as Platform[]).indexOf(platform) >= 0;
  }
  public async getInfo(env: Environment, opts: any): Promise<ExtractorResult> {
    if (!this.handlesPlatform(env.platform))
      throw new Error(
        `Extractor ${this.name} does not support ${Platform[env.platform]}`
      );
    let cmd = Object.keys(opts).reduce(
      (acc, item) => {
        if (item === 'name') return acc;
        acc.push(item);
        return acc;
      },
      [] as string[]
    )[0];
    if (!cmd)
      throw new Error(
        `Extractor ${this.name} didn't know which command to execute`
      );

    let ev = await this.getInfoForEnvironment(env, cmd, opts);
    let raw = BaseExtractor.unbrand(ev);
    let normalized = normalizeValue(raw, this.normalizerOptions || undefined);
    let matcher: ValueMatcher = cmd ? (opts as any)[cmd] : opts;
    return {
      raw,
      cmd,
      normalized,
      name: this.name,
      target: matcher,
      match: isOk(normalized, matcher)
    };
  }
  protected abstract async getInfoForEnvironment(
    env: Environment,
    cmd: string,
    opts?: any
  ): Promise<ExtractorValue>;

  constructor({ name, platforms, normalizerOptions }: BaseExtractorOptions) {
    this.platforms = platforms;
    this.name = name;
    this.normalizerOptions = normalizerOptions;
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

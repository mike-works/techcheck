import { Platform } from '../enums/platform';
import Environment from '../environment';

export interface BaseExtractorOptions {
  name: string;
  platforms: Platform[];
}

export abstract class BaseExtractor<Opts = {}, Info = string> {
  public readonly platforms: Platform[];
  public readonly name: string;
  public abstract async getInfo(env: Environment, opts: Opts): Promise<Info>;
  constructor({ name, platforms }: BaseExtractorOptions) {
    this.platforms = platforms;
    this.name = name;
  }
}

export default BaseExtractor;

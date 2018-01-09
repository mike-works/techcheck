import Environment, { EnvironmentOptions } from '../environment';

export interface InspectorOptions {
  env: Environment;
}

export interface InspectorVersionInfo {
  raw: string;
  normalized: string;
}

export interface InspectorInfoItems {
  version: InspectorVersionInfo;
}

export interface InspectorInfoExtractor<K extends string, V> {
  get(env: Readonly<Environment>): Promise<V>;
}

export abstract class Inspector<T extends InspectorInfoItems = InspectorInfoItems> {
  public env: Readonly<Environment>;
  protected extractors: { [P in keyof T]: InspectorInfoExtractor<P, T[P]> };
  constructor(opts: InspectorOptions) {
    this.env = Object.freeze(opts.env);
    console.log('this.env', this.env);
    this.extractors = {} as any;
    this.extractors.version = {
      get: () => this.getVersion()
    };
  }

  public abstract async getVersion(): Promise<InspectorVersionInfo>;
}

export default Inspector;

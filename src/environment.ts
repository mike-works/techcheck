import Platform, { getPlatform, SupportedPlatform } from './enums/platform';
import ProjectConfig from './project/config';

export interface EnvironmentOptions {
  platform: Platform;
}

const DEFAULT_ENVIRONMENT_OPTIONS: EnvironmentOptions = {
  platform: getPlatform()
};

export default class Environment {
  public platform: Readonly<SupportedPlatform>;
  protected config: Readonly<ProjectConfig>;
  protected options: Readonly<EnvironmentOptions>;
  constructor(opts?: Partial<EnvironmentOptions>) {
    this.options = Object.assign(
      Object.assign({}, DEFAULT_ENVIRONMENT_OPTIONS),
      opts
    );
    if (this.options.platform === Platform.Unsupported)
      throw new Error(
        `Unsupported platform: ${Platform[this.options.platform]}`
      );
    this.platform = this.options.platform;
  }
}

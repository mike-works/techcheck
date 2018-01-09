import Platform, { getPlatform } from './enums/platform';
import ProjectConfig from './project/config';

export interface EnvironmentOptions {
  platform: Platform;
}

const DEFAULT_ENVIRONMENT_OPTIONS: EnvironmentOptions = {
  platform: getPlatform()
};

export default class Environment {
  public platform: Readonly<Platform>;
  protected config: Readonly<ProjectConfig>;
  protected options: Readonly<EnvironmentOptions>;
  constructor(opts?: Partial<EnvironmentOptions>) {
    this.options = Object.assign(Object.assign({}, DEFAULT_ENVIRONMENT_OPTIONS), opts);
    this.platform = this.options.platform;
  }
}

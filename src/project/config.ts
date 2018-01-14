import * as fs from 'fs';
import * as path from 'path';
import { validateConfig } from './config-validator';
import { indentError } from '../utils/format-error';
import chalk from 'chalk';
import { ValueMatcher } from '../checker';

async function getIfExists(filepath: string): Promise<any> {
  return new Promise((res, rej) => {
    fs.exists(filepath, exists => {
      if (exists) {
        res(require(filepath));
      } else {
        res(undefined);
      }
    });
  });
}

async function findConfig(dir = process.cwd()): Promise<any> {
  let configModule = await getIfExists(path.join(dir, 'techcheck.config.js'));
  if (configModule) return configModule;
  return findConfig(path.join(dir, '..'));
}

export interface ConfigVerifyOption {
  name: string;
  version?: ValueMatcher;
}

export interface ConfigOptions {
  verify: ConfigVerifyOption[];
}

export class ProjectConfig {
  private optionsModule?: ConfigOptions;
  public get options(): Readonly<ConfigOptions> {
    if (!this.optionsModule)
      throw new Error(
        `Attempted to access project config options before it was populated`
      );
    return this.optionsModule;
  }
  public async setup() {
    let optionsModule = await findConfig();
    let messages = validateConfig(optionsModule);
    this.optionsModule = optionsModule;
    if (messages.length > 0) {
      throw new Error(
        messages
          .map(m =>
            chalk.bgRed.white(
              `Config file format error at ${m.path}, ${m.message}`
            )
          )
          .join('\n')
      );
    }
  }
}

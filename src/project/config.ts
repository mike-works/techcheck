import * as fs from 'fs';
import * as path from 'path';
import { validateConfig } from './config-validator';
import { indentError } from '../utils/format-error';
import chalk from 'chalk';
import { ValueMatcher } from '../checker';
import { first } from '../utils/promise';

const CONFIG_FILE_NAMES = ['techcheck.config.js', 'techcheck.config.ts'];

async function getIfExists(
  filepaths: string[]
): Promise<{ filepath: string; module: any }> {
  function getIfSinglePathExists(filepath: string): Promise<any> {
    return new Promise((res, rej) => {
      fs.exists(filepath, exists => {
        if (exists) {
          res({ filepath, module: require(filepath) });
        } else {
          rej(undefined);
        }
      });
    });
  }
  return first(...filepaths.map(getIfSinglePathExists));
}

async function findConfig(dir = process.cwd()): Promise<any> {
  let { filepath, module: configModule } = await getIfExists(
    CONFIG_FILE_NAMES.map(x => path.join(dir, x))
  );
  console.log('Using TechCheck config file:', filepath);
  if (configModule) return configModule;
  let parentDir = path.join(dir, '..');
  if (parentDir === dir) throw new Error('Could not find a configuration');
  return findConfig(parentDir);
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
    let optionsModule =
      typeof global.TechCheckConfig !== 'undefined'
        ? global.TechCheckConfig
        : await findConfig();

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

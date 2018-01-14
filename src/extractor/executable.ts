import BaseExtractor, { BaseExtractorOptions, ExtractorValue } from './base';
import Environment from '../environment';
import { runCommand } from '../utils/run-command';
import { Platform } from '../enums/platform';

export interface ExecutableExtractorOptions extends BaseExtractorOptions {
  commands: {
    [k: string]: string;
  };
}

export class ExecutableExtractor extends BaseExtractor {
  private readonly commands: {
    [k: string]: string;
  };
  public async getInfoForEnvironment(
    env: Environment,
    cmd: string,
    opts: any
  ): Promise<ExtractorValue> {
    let commandResult;
    try {
      commandResult = (await runCommand(this.commands[cmd])).trim();
    } catch (e) {
      commandResult = 'NOT-FOUND';
    }
    return {
      val: commandResult,
      _brand: BaseExtractor.brandStamp
    };
  }
  constructor(opts: ExecutableExtractorOptions) {
    super(opts);
    this.commands = JSON.parse(JSON.stringify(opts.commands));
  }
}

export default ExecutableExtractor;

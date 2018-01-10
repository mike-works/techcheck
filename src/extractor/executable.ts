import BaseExtractor, { BaseExtractorOptions, ExtractorValue } from './base';
import Environment from '../environment';
import { runCommand } from '../utils/run-command';
import { Platform } from '../enums/platform';

export interface ExecutableExtractorOptions extends BaseExtractorOptions {
  command: string;
}

export class ExecutableExtractor extends BaseExtractor {
  private readonly command: string;
  public async getInfoForEnvironment(): Promise<ExtractorValue> {
    return {
      val: (await runCommand(this.command)).trim(),
      _brand: BaseExtractor.brandStamp
    };
  }
  constructor({ name, platforms, command }: ExecutableExtractorOptions) {
    super({ name, platforms });
    this.command = command;
  }
}

export default ExecutableExtractor;

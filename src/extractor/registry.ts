import { BaseExtractor } from '../extractor/base';
import { ExecutableExtractor } from '../extractor/executable';
import { Platform } from '../enums/platform';
import Environment from '../environment';
import { indentError } from '../utils/format-error';

type ExtractorInfo = BaseExtractor;

const OPENSSL_EXTRACTOR = new ExecutableExtractor({
  name: 'OpenSSL',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'openssl version' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

const NODE_EXTRACTOR = new ExecutableExtractor({
  name: 'Node.js',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'node --version' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

const POSTGRES_EXTRACTOR = new ExecutableExtractor({
  name: 'PosgreSQL',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'pg_ctl --version' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

export class ExtractorRegistry {
  protected extractors: { [k: string]: ExtractorInfo };
  constructor() {
    this.extractors = {};
  }

  public async setup() {
    try {
      this.setupStandardExtractors();
    } catch (e) {
      let err = e as Error;
      err.message = indentError(
        'Unable to setup extractor registry',
        '  ',
        err.message
      );
      throw err;
    }
  }

  setupStandardExtractors() {
    this.extractors.openssl = OPENSSL_EXTRACTOR;
    this.extractors.node = NODE_EXTRACTOR;
    this.extractors.postgres = POSTGRES_EXTRACTOR;
  }

  public getExtractor(name: string): BaseExtractor | null {
    return this.extractors[name] || null;
  }
}

export default ExtractorRegistry;

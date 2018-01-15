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

const RUBY_EXTRACTOR = new ExecutableExtractor({
  name: 'Ruby',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'ruby -v' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

const GEM_EXTRACTOR = new ExecutableExtractor({
  name: 'Gem',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'gem -v' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

const GIT_EXTRACTOR = new ExecutableExtractor({
  name: 'Git',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'git --version' },
  normalizerOptions: {
    preprocessor: /[0-9\.]+/
  }
});

const EMBER_CLI_EXTRACTOR = new ExecutableExtractor({
  name: 'Ember-CLI',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'ember -v' },
  normalizerOptions: {
    preprocessor: /ember-cli:\s([0-9\.]+)\n/
  }
});

const TRAVIS_CI_GEM_EXTRACTOR = new ExecutableExtractor({
  name: 'Travis-CI Gem',
  platforms: [Platform.Win32, Platform.Posix],
  commands: { version: 'travis -v' },
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
    this.extractors.ruby = RUBY_EXTRACTOR;
    this.extractors.gem = GEM_EXTRACTOR;
    this.extractors.git = GIT_EXTRACTOR;
    this.extractors['ember-cli'] = EMBER_CLI_EXTRACTOR;
    this.extractors.travis = TRAVIS_CI_GEM_EXTRACTOR;
  }

  public getExtractor(name: string): BaseExtractor | null {
    return this.extractors[name] || null;
  }
}

export default ExtractorRegistry;

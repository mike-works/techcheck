/// <reference types="node" />
declare module "enums/platform" {
    export enum Platform {
        Win32 = 0,
        Posix = 1,
        Unsupported = 2,
    }
    export const POSIX_PLATFORMS: NodeJS.Platform[];
    export type SupportedPlatform = Platform.Posix | Platform.Win32;
    export function isPlatform(platform: Platform): boolean;
    export function platformFor(platform: NodeJS.Platform): Platform;
    export function getPlatform(): Platform;
    export default Platform;
}
declare module "project/config" {
    export default class ProjectConfig {
    }
}
declare module "environment" {
    import Platform, { SupportedPlatform } from "enums/platform";
    import ProjectConfig from "project/config";
    export interface EnvironmentOptions {
        platform: Platform;
    }
    export default class Environment {
        platform: Readonly<SupportedPlatform>;
        protected config: Readonly<ProjectConfig>;
        protected options: Readonly<EnvironmentOptions>;
        constructor(opts?: Partial<EnvironmentOptions>);
    }
}
declare module "checker/base" {
    export type ValueAdjuster = RegExp | ((raw: string) => string);
    export type SemVerMatcher = {
        range?: string;
        min?: string;
        max?: string;
    };
    export type ValueMatcher = RegExp | string | {
        semver: SemVerMatcher;
    } | ((raw: string) => boolean);
    export type ExtractorValue = string;
    export interface BaseCheckerOptions {
        preprocessor?: ValueAdjuster;
        matcher: ValueMatcher;
        name: string;
    }
    export class BaseChecker {
        protected preprocessor?: ValueAdjuster;
        protected matcher?: ValueMatcher;
        readonly name: string;
        constructor(opts: BaseCheckerOptions);
        isOk(v: ExtractorValue): boolean;
    }
    export default BaseChecker;
}
declare module "extractor/base" {
    import { Platform, SupportedPlatform } from "enums/platform";
    import Environment from "environment";
    export interface BaseExtractorOptions {
        name: string;
        platforms: SupportedPlatform[];
    }
    export abstract class BaseExtractor<Opts = {}> {
        readonly platforms: SupportedPlatform[];
        readonly name: string;
        handlesPlatform(platform: Platform): boolean;
        getInfo(env: Environment, opts?: Opts): Promise<string>;
        protected abstract getInfoForEnvironment(env: Environment, opts?: Opts): Promise<string>;
        constructor({name, platforms}: BaseExtractorOptions);
    }
    export default BaseExtractor;
}
declare module "utils/run-command" {
    /**
     * Execute a shell/bash command
     * @param command command to run
     * @return result of command
     */
    export function runCommand(command: string): Promise<string>;
}
declare module "extractor/executable" {
    import BaseExtractor, { BaseExtractorOptions } from "extractor/base";
    export interface ExecutableExtractorOptions extends BaseExtractorOptions {
        command: string;
    }
    export class ExecutableExtractor extends BaseExtractor {
        private readonly command;
        getInfoForEnvironment(): Promise<string>;
        constructor({name, platforms, command}: ExecutableExtractorOptions);
    }
}
declare module "index" {
}
declare module "extractor/or" {
    import BaseExtractor from "extractor/base";
    import Environment from "environment";
    export default class OrExtractor extends BaseExtractor {
        private extractors;
        getInfoForEnvironment(env: Environment, opts: {}): Promise<string>;
        constructor({extractors}: {
            extractors: BaseExtractor[];
        });
    }
}

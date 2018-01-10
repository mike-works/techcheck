import { platform as nodePlatform } from 'os';

export enum Platform {
  Win32,
  Posix,
  Unsupported
}

export const POSIX_PLATFORMS: NodeJS.Platform[] = [
  'aix',
  'darwin',
  'freebsd',
  'linux',
  'openbsd',
  'cygwin'
];

export type SupportedPlatform = Platform.Posix | Platform.Win32;

export function isPlatform(platform: Platform): boolean {
  return getPlatform() === platform;
}

export function platformFor(platform: NodeJS.Platform): Platform {
  if (platform === 'win32') {
    return Platform.Win32;
  }
  if (POSIX_PLATFORMS.indexOf(platform) >= 0) {
    return Platform.Posix;
  }
  return Platform.Unsupported;
}

export function getPlatform(): Platform {
  let p = nodePlatform();
  return platformFor(p);
}

export default Platform;

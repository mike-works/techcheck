"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var Platform;
(function (Platform) {
    Platform[Platform["Win32"] = 0] = "Win32";
    Platform[Platform["Posix"] = 1] = "Posix";
    Platform[Platform["Unsupported"] = 2] = "Unsupported";
})(Platform = exports.Platform || (exports.Platform = {}));
exports.POSIX_PLATFORMS = [
    'aix',
    'darwin',
    'freebsd',
    'linux',
    'openbsd',
    'cygwin'
];
function isPlatform(platform) {
    return getPlatform() === platform;
}
exports.isPlatform = isPlatform;
function platformFor(platform) {
    if (platform === 'win32') {
        return Platform.Win32;
    }
    if (exports.POSIX_PLATFORMS.indexOf(platform) >= 0) {
        return Platform.Posix;
    }
    return Platform.Unsupported;
}
exports.platformFor = platformFor;
function getPlatform() {
    var p = os_1.platform();
    return platformFor(p);
}
exports.getPlatform = getPlatform;
exports.default = Platform;
//# sourceMappingURL=platform.js.map
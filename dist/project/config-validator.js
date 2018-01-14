"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = require("semver");
function validateVerifyItem(dep, i) {
    if (typeof dep.name !== 'string')
        return [{ path: "root.verify[" + i + "].name", message: 'should be a string' }];
    if (dep.version instanceof RegExp)
        return [];
    if (dep.version instanceof Function)
        return [];
    if (typeof dep.version === 'string')
        return [];
    if (dep.version instanceof Array) {
        return [
            { path: "root.verify[" + i + "].version", message: 'should be an array' }
        ];
    }
    if (dep.version instanceof Object) {
        var o = dep.version;
        if (typeof o.semver === 'string') {
            if (semver_1.validRange(o.semver))
                return [];
            return [
                {
                    path: "root.verify[" + i + "].version.semver",
                    message: "invalid semver string: " + o.semver
                }
            ];
        }
        if (dep.version.semver &&
            (dep.version.semver.min ||
                dep.version.semver.max ||
                dep.version.semver.range))
            return [];
        return [
            {
                path: "root.verify[" + i + "].version",
                message: "invalid object " + JSON.stringify(dep.version)
            }
        ];
    }
    return [];
}
function validateVerifyArray(verifyArr) {
    if (!(verifyArr instanceof Array)) {
        return [{ path: 'root.verify', message: 'should be an array' }];
    }
    for (var i = 0; i < verifyArr.length; i++) {
        var dep = verifyArr[i];
        var errors = validateVerifyItem(dep, i);
        if (errors.length > 0)
            return errors;
    }
    return [];
}
function validateConfig(configModule) {
    if (!(configModule.verify instanceof Object)) {
        return [{ path: 'root', message: 'should be an object' }];
    }
    var verifyErrors = validateVerifyArray(configModule.verify);
    if (verifyErrors.length > 0)
        return verifyErrors;
    return [];
}
exports.validateConfig = validateConfig;
//# sourceMappingURL=config-validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = require("semver");
function doesSemverMatch(version, m) {
    var range = typeof m !== 'string' ? m.range : m;
    var min;
    var max;
    if (typeof m !== 'string') {
        min = m.min;
        max = m.max;
    }
    if (typeof range !== 'undefined') {
        return semver_1.satisfies(version, range);
    }
    if (typeof max !== 'undefined') {
        if (typeof min !== 'undefined') {
            return semver_1.gte(version, min) && semver_1.lte(version, max);
        }
        return semver_1.lte(version, max);
    }
    if (typeof min !== 'undefined') {
        return semver_1.gte(version, min);
    }
    throw new Error("Invalid SemVerMatcher object " + JSON.stringify(m));
}
function doesMatch(v, m) {
    var val = v;
    if (m instanceof RegExp) {
        return m.test(val);
    }
    if (typeof m === 'string') {
        return m === val;
    }
    if (m instanceof Function) {
        return m(val);
    }
    return doesSemverMatch(val, m.semver);
}
function validateMatcher(matcher) {
    if (matcher instanceof RegExp)
        return true;
    if (matcher instanceof Function)
        return true;
    if (typeof matcher === 'string')
        return true;
    if (matcher.semver &&
        ((typeof matcher.semver === 'string' && !!semver_1.validRange(matcher.semver)) ||
            (typeof matcher.semver !== 'string' &&
                (matcher.semver.max || matcher.semver.min || matcher.semver.range))))
        return true;
    return false;
}
function isOk(v, matcher) {
    if (typeof matcher === 'undefined' || !validateMatcher(matcher))
        throw new Error("Invalid matcher: " + JSON.stringify(matcher));
    var matches = doesMatch(v, matcher);
    return matches;
}
exports.isOk = isOk;
//# sourceMappingURL=checker.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkObjectKeys(obj, required, optional) {
    var errors = [];
    checkObjectKeysImpl(obj, errors, required, optional);
    return errors;
}
exports.checkObjectKeys = checkObjectKeys;
function checkObjectKeysImpl(obj, errors, required, optional) {
    var objKeys = Object.keys(obj);
    var checked = {};
    for (var i = 0; i < required.length; i++) {
        if (objKeys.indexOf(required[i]) < 0) {
            errors.push("Missing required key: \"" + required[i] + "\"");
            errors.push("Missing required key: \"" + required[i] + "\"");
            errors.push("Missing required key: \"" + required[i] + "\"");
            errors.push("Missing required key: \"" + required[i] + "\"");
        }
        checked[required[i]] = true;
    }
    if (!optional)
        return errors;
    for (var j = 0; j < objKeys.length; j++) {
        if (checked[objKeys[j]])
            continue;
        if (optional.indexOf(objKeys[j]) < 0)
            errors.push("Unknown key: \"" + objKeys[j] + "\"");
    }
    return true;
}
//# sourceMappingURL=compare.js.map
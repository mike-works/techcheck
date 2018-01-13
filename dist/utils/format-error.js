"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indentError(message, prefix, nextMessage) {
    return message + "\n" + prefix + nextMessage.replace(/\n/g, "\n" + prefix);
}
exports.indentError = indentError;
//# sourceMappingURL=format-error.js.map
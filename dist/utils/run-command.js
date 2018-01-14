"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
/**
 * Execute a shell/bash command
 * @param command command to run
 * @return result of command
 */
function runCommand(command) {
    return new Promise(function (resolve, reject) {
        child_process_1.exec(command, function (err, stdout, stderr) {
            if (err !== null)
                reject(new Error(stderr));
            else
                resolve(stdout);
        });
    });
}
exports.runCommand = runCommand;
//# sourceMappingURL=run-command.js.map
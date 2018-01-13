"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var evaluator_1 = require("./evaluator");
function successMessage(s, r) {
    var str = "  \u2705  " + r.name + "\t" + r.message;
    str += chalk.grey("\t(required: " + formatMatcher(r.target) + " )");
    s.write(str + '\n');
}
function failMessage(s, r) {
    var str = "  \uD83D\uDED1  " + r.name + "\t" + r.message;
    str += chalk.grey("\t(required: " + formatMatcher(r.target) + " )");
    s.write(str + '\n');
}
function warnMessage(s, r) {
    s.write("  \u26A0\uFE0F  " + r.name + "\n");
}
function errorMessage(s, r) {
    s.write("  \uD83D\uDCA5  " + r.name + "\n");
}
function formatExtractorResults(s, results) {
    s.write('\n' +
        chalk.yellow("🔍 TechCheck Scan: Making sure you're all set up 🔎") +
        '\n');
    s.write(' ------------------------------------------------\n');
    results.forEach(function (r) {
        if (r.status === evaluator_1.EvaluatorStatus.Ok)
            successMessage(s, r);
        if (r.status === evaluator_1.EvaluatorStatus.Error)
            errorMessage(s, r);
        if (r.status === evaluator_1.EvaluatorStatus.Warning)
            warnMessage(s, r);
        if (r.status === evaluator_1.EvaluatorStatus.Fail)
            failMessage(s, r);
    });
}
exports.formatExtractorResults = formatExtractorResults;
function formatMatcher(valueMatcher) {
    if (typeof valueMatcher === 'string') {
        return '= ' + chalk.yellow("\"" + valueMatcher + "\"");
    }
    if (valueMatcher instanceof RegExp) {
        return '~ ' + chalk.magenta("/" + valueMatcher.source + "/");
    }
    if (valueMatcher instanceof Function) {
        return chalk.cyan("" + valueMatcher.toString());
    }
    if (valueMatcher.semver) {
        var sv = valueMatcher.semver;
        if (typeof sv === 'string') {
            return chalk.green("" + sv);
        }
        if (sv.range) {
            return chalk.green("" + sv.range);
        }
        if (sv.min && sv.max) {
            return chalk.green(">= " + sv.min + " && <= " + sv.max);
        }
        if (sv.min) {
            return chalk.green(">= " + sv.min);
        }
        if (sv.max) {
            return chalk.green("<= " + sv.max);
        }
    }
}
//# sourceMappingURL=formatter.js.map
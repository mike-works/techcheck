"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var evaluator_1 = require("./evaluator");
require("es6-promise/auto");
var chalk = require("chalk");
var config_1 = require("./project/config");
var format_error_1 = require("./utils/format-error");
var registry_1 = require("./extractor/registry");
var environment_1 = require("./environment");
var formatter_1 = require("./formatter");
function coreSetup() {
    return __awaiter(this, void 0, void 0, function () {
        var registry, e_1, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    registry = new registry_1.ExtractorRegistry();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, registry.setup()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { registry: registry }];
                case 3:
                    e_1 = _a.sent();
                    err = e_1;
                    err.message = format_error_1.indentError('Unable to setup extractor registry', '  ', err.message);
                    throw err;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function projectSetup() {
    return __awaiter(this, void 0, void 0, function () {
        var config, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = new config_1.ProjectConfig();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, config.setup()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    err = e_2;
                    err.message = format_error_1.indentError('Unable to setup project config', '  ', err.message);
                    throw err;
                case 4: return [2 /*return*/, { config: config }];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var env, registry, config, evaluator, verificationResult, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    env = new environment_1.default();
                    return [4 /*yield*/, coreSetup()];
                case 1:
                    registry = (_a.sent()).registry;
                    return [4 /*yield*/, projectSetup()];
                case 2:
                    config = (_a.sent()).config;
                    evaluator = new evaluator_1.default({ env: env, registry: registry, config: config });
                    return [4 /*yield*/, evaluator.processVerifications()];
                case 3:
                    verificationResult = _a.sent();
                    formatter_1.formatExtractorResults(process.stdout, verificationResult);
                    success = verificationResult.reduce(function (acc, item) {
                        if (!acc)
                            return acc;
                        return ([evaluator_1.EvaluatorStatus.Ok, evaluator_1.EvaluatorStatus.Warning].indexOf(item.status) >= 0);
                    }, true);
                    return [2 /*return*/, success];
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main()];
                case 1:
                    ok = _a.sent();
                    process.exit(ok ? 0 : 1);
                    return [2 /*return*/];
            }
        });
    });
})().catch(function (e) {
    var err = e;
    var message = "" + e;
    if (e instanceof Error && e.stack) {
        message = e.stack;
    }
    message = message
        .split('\n')
        .map(function (x) { return chalk.red(x); })
        .join('\n');
    console.error(chalk.red(message));
});
//# sourceMappingURL=index.js.map
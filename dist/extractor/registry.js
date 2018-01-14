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
var executable_1 = require("../extractor/executable");
var platform_1 = require("../enums/platform");
var format_error_1 = require("../utils/format-error");
var OPENSSL_EXTRACTOR = new executable_1.ExecutableExtractor({
    name: 'OpenSSL',
    platforms: [platform_1.Platform.Win32, platform_1.Platform.Posix],
    commands: { version: 'openssl version' },
    normalizerOptions: {
        preprocessor: /[0-9\.]+/
    }
});
var NODE_EXTRACTOR = new executable_1.ExecutableExtractor({
    name: 'Node.js',
    platforms: [platform_1.Platform.Win32, platform_1.Platform.Posix],
    commands: { version: 'node --version' },
    normalizerOptions: {
        preprocessor: /[0-9\.]+/
    }
});
var POSTGRES_EXTRACTOR = new executable_1.ExecutableExtractor({
    name: 'PosgreSQL',
    platforms: [platform_1.Platform.Win32, platform_1.Platform.Posix],
    commands: { version: 'pg_ctl --version' },
    normalizerOptions: {
        preprocessor: /[0-9\.]+/
    }
});
var ExtractorRegistry = /** @class */ (function () {
    function ExtractorRegistry() {
        this.extractors = {};
    }
    ExtractorRegistry.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_a) {
                try {
                    this.setupStandardExtractors();
                }
                catch (e) {
                    err = e;
                    err.message = format_error_1.indentError('Unable to setup extractor registry', '  ', err.message);
                    throw err;
                }
                return [2 /*return*/];
            });
        });
    };
    ExtractorRegistry.prototype.setupStandardExtractors = function () {
        this.extractors.openssl = OPENSSL_EXTRACTOR;
        this.extractors.node = NODE_EXTRACTOR;
        this.extractors.postgres = POSTGRES_EXTRACTOR;
    };
    ExtractorRegistry.prototype.getExtractor = function (name) {
        return this.extractors[name] || null;
    };
    return ExtractorRegistry;
}());
exports.ExtractorRegistry = ExtractorRegistry;
exports.default = ExtractorRegistry;
//# sourceMappingURL=registry.js.map
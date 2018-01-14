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
var platform_1 = require("../enums/platform");
var checker_1 = require("../checker");
function normalizeValue(s, vf) {
    if (!vf)
        return s;
    if (vf instanceof RegExp) {
        var parts = vf.exec(s);
        if (parts && parts.length > 0) {
            return parts[0];
        }
        return '';
    }
    return vf(s);
}
var BaseExtractor = /** @class */ (function () {
    function BaseExtractor(_a) {
        var name = _a.name, platforms = _a.platforms, normalizerOptions = _a.normalizerOptions;
        this.platforms = platforms;
        this.name = name;
        this.normalizerOptions = normalizerOptions;
    }
    BaseExtractor.prototype.handlesPlatform = function (platform) {
        return this.platforms.indexOf(platform) >= 0;
    };
    BaseExtractor.prototype.getInfo = function (env, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var cmd, ev, raw, normalized, matcher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.handlesPlatform(env.platform))
                            throw new Error("Extractor " + this.name + " does not support " + platform_1.Platform[env.platform]);
                        cmd = Object.keys(opts).reduce(function (acc, item) {
                            if (item === 'name')
                                return acc;
                            acc.push(item);
                            return acc;
                        }, [])[0];
                        if (!cmd)
                            throw new Error("Extractor " + this.name + " didn't know which command to execute");
                        return [4 /*yield*/, this.getInfoForEnvironment(env, cmd, opts)];
                    case 1:
                        ev = _a.sent();
                        raw = BaseExtractor.unbrand(ev);
                        normalized = normalizeValue(raw, this.normalizerOptions ? this.normalizerOptions.preprocessor : undefined);
                        matcher = cmd ? opts[cmd] : opts;
                        return [2 /*return*/, {
                                raw: raw,
                                cmd: cmd,
                                normalized: normalized,
                                name: this.name,
                                target: matcher,
                                match: checker_1.isOk(normalized, matcher)
                            }];
                }
            });
        });
    };
    BaseExtractor.unbrand = function (v) {
        return v.val;
    };
    BaseExtractor.brand = function (s) {
        return {
            val: s,
            _brand: BaseExtractor.brandStamp
        };
    };
    return BaseExtractor;
}());
exports.BaseExtractor = BaseExtractor;
exports.default = BaseExtractor;
//# sourceMappingURL=base.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = require("./base");
var platform_1 = require("../enums/platform");
var OrExtractor = /** @class */ (function (_super) {
    __extends(OrExtractor, _super);
    function OrExtractor(_a) {
        var extractors = _a.extractors;
        var _this = this;
        var platforms = extractors
            .map(function (e) { return e.platforms; })
            .reduce(function (arr, thisPlatforms) {
            var toAdd = [];
            for (var i = 0; i < thisPlatforms.length; i++) {
                var p = thisPlatforms[i];
                if (arr.indexOf(p) < 0 && toAdd.indexOf(p) < 0) {
                    toAdd.push(p);
                }
                else {
                    throw new Error('Platform overlap detected!');
                }
            }
            return arr.concat(toAdd);
        }, []);
        _this = _super.call(this, {
            platforms: platforms,
            normalizerOptions: {},
            name: "Or (" + extractors.map(function (e) { return e.name; }).join(', ') + ")"
        }) || this;
        _this.extractors = extractors;
        return _this;
    }
    OrExtractor.prototype.getInfoForEnvironment = function (env, cmd, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var i, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.extractors.length)) return [3 /*break*/, 4];
                        if (!this.extractors[i].handlesPlatform(env.platform)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.extractors[i].getInfo(env, opts)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, base_1.default.brand(result.normalized)];
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: throw new Error("No extractor found for platform " + platform_1.Platform[env.platform]);
                }
            });
        });
    };
    return OrExtractor;
}(base_1.default));
exports.default = OrExtractor;
//# sourceMappingURL=or.js.map
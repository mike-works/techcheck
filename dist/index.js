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
define("src/enums/platform", ["require", "exports", "os"], function (require, exports, os) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Platform;
    (function (Platform) {
        Platform[Platform["Win32"] = 0] = "Win32";
        Platform[Platform["Posix"] = 1] = "Posix";
        Platform[Platform["Unsupported"] = 2] = "Unsupported";
    })(Platform = exports.Platform || (exports.Platform = {}));
    exports.POSIX_PLATFORMS = ['aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'cygwin'];
    function isPlatform(platform) {
        return getPlatform() === platform;
    }
    exports.isPlatform = isPlatform;
    function platformFor(platform) {
        if (platform === 'win32') {
            return Platform.Win32;
        }
        if (exports.POSIX_PLATFORMS.indexOf(platform) >= 0) {
            return Platform.Posix;
        }
        return Platform.Unsupported;
    }
    exports.platformFor = platformFor;
    function getPlatform() {
        var p = os.platform();
        return platformFor(p);
    }
    exports.getPlatform = getPlatform;
    exports.default = Platform;
});
define("src/project/config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProjectConfig = /** @class */ (function () {
        function ProjectConfig() {
        }
        return ProjectConfig;
    }());
    exports.default = ProjectConfig;
});
define("src/environment", ["require", "exports", "src/enums/platform"], function (require, exports, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DEFAULT_ENVIRONMENT_OPTIONS = {
        platform: platform_1.getPlatform()
    };
    var Environment = /** @class */ (function () {
        function Environment(opts) {
            this.options = Object.assign(Object.assign({}, DEFAULT_ENVIRONMENT_OPTIONS), opts);
            this.platform = this.options.platform;
        }
        return Environment;
    }());
    exports.default = Environment;
});
(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (res) {
                        setTimeout(function () {
                            process.stdout.write('Checking some other things');
                            res();
                        }, 2000);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
define("src/checker/base", ["require", "exports", "semver"], function (require, exports, semver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function normalizeExtractorValue(v, adj) {
        if (adj instanceof RegExp) {
            var parts = adj.exec(v);
            if (parts === null || parts.length === 0)
                throw new Error("Could not normalize value " + v + " with " + adj);
            return parts[0];
        }
        return adj(v);
    }
    function doesMatch(v, m) {
        if (m instanceof RegExp) {
            return m.test(v);
        }
        if (typeof m === 'string') {
            return m === v;
        }
        if (m instanceof Function) {
            return m(v);
        }
        return semver_1.satisfies(v, m.semverRange);
    }
    var BaseChecker = /** @class */ (function () {
        function BaseChecker(opts) {
            this.preprocessor = opts.preprocessor;
            this.matcher = opts.matcher;
            this.name = opts.name;
        }
        BaseChecker.prototype.isOk = function (v) {
            var normalized = typeof this.preprocessor !== 'undefined' ? normalizeExtractorValue(v, this.preprocessor) : v;
            if (typeof this.matcher === 'undefined')
                throw new Error("Checker " + this.name + " does not have a matcher");
            var matches = doesMatch(normalized, this.matcher);
            return matches;
        };
        return BaseChecker;
    }());
    exports.BaseChecker = BaseChecker;
    exports.default = BaseChecker;
});
define("src/extractor/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseExtractor = /** @class */ (function () {
        function BaseExtractor(_a) {
            var name = _a.name, platforms = _a.platforms;
            this.platforms = platforms;
            this.name = name;
        }
        return BaseExtractor;
    }());
    exports.BaseExtractor = BaseExtractor;
    exports.default = BaseExtractor;
});
define("src/utils/run-command", ["require", "exports", "child_process"], function (require, exports, child_process_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Execute a shell/bash command
     * @param command command to run
     * @return result of command
     */
    function runCommand(command) {
        return new Promise(function (resolve, reject) {
            child_process_1.exec(command, function (err, stdout, stderr) {
                if (err !== null)
                    reject(stderr);
                else
                    resolve(stdout);
            });
        });
    }
    exports.runCommand = runCommand;
});
define("src/extractor/executable", ["require", "exports", "src/extractor/base", "src/utils/run-command"], function (require, exports, base_1, run_command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExecutableExtractor = /** @class */ (function (_super) {
        __extends(ExecutableExtractor, _super);
        function ExecutableExtractor(_a) {
            var name = _a.name, platforms = _a.platforms, command = _a.command;
            var _this = _super.call(this, { name: name, platforms: platforms }) || this;
            _this.command = command;
            return _this;
        }
        ExecutableExtractor.prototype.getInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, run_command_1.runCommand(this.command)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ExecutableExtractor;
    }(base_1.default));
    exports.ExecutableExtractor = ExecutableExtractor;
});
define("src/extractor/or", ["require", "exports", "src/extractor/base", "src/enums/platform"], function (require, exports, base_2, platform_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OrExtractor = /** @class */ (function (_super) {
        __extends(OrExtractor, _super);
        function OrExtractor(_a) {
            var extractors = _a.extractors;
            var _this = this;
            var platforms = extractors.map(function (e) { return e.platforms; }).reduce(function (arr, thisPlatforms) {
                var toAdd = [];
                thisPlatforms.forEach(function (p) {
                    if (arr.indexOf(p) < 0 && toAdd.indexOf(p) < 0) {
                        toAdd.push(p);
                    }
                });
                return arr.concat(toAdd);
            }, []);
            _this = _super.call(this, { platforms: platforms, name: "Or (" + extractors.map(function (e) { return e.name; }).join(', ') + ")" }) || this;
            _this.extractors = extractors;
            return _this;
        }
        OrExtractor.prototype.getInfo = function (env, opts) {
            for (var i = 0; i < this.extractors.length; i++) {
                if (this.extractors[i].platforms.indexOf(env.platform) >= 0) {
                    return this.extractors[i].getInfo(env, opts);
                }
            }
            throw new Error("No extractor found for platform " + platform_2.Platform[env.platform]);
        };
        return OrExtractor;
    }(base_2.default));
    exports.default = OrExtractor;
});
define("src/inspector/base", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Inspector = /** @class */ (function () {
        function Inspector(opts) {
            var _this = this;
            this.env = Object.freeze(opts.env);
            console.log('this.env', this.env);
            this.extractors = {};
            this.extractors.version = {
                get: function () { return _this.getVersion(); }
            };
        }
        return Inspector;
    }());
    exports.Inspector = Inspector;
    exports.default = Inspector;
});
module.exports = function exit(exitCode, streams) {
    if (!streams) {
        streams = [process.stdout, process.stderr];
    }
    var drainCount = 0;
    // Actually exit if all streams are drained.
    function tryToExit() {
        if (drainCount === streams.length) {
            process.exit(exitCode);
        }
    }
    streams.forEach(function (stream) {
        // Count drained streams now, but monitor non-drained streams.
        if (stream.bufferSize === 0) {
            drainCount++;
        }
        else {
            stream.write('', 'utf-8', function () {
                drainCount++;
                tryToExit();
            });
        }
        // Prevent further writing.
        stream.write = function () { };
    });
    // If all streams were already drained, exit now.
    tryToExit();
    // In Windows, when run as a Node.js child process, a script utilizing
    // this library might just exit with a 0 exit code, regardless. This code,
    // despite the fact that it looks a bit crazy, appears to fix that.
    process.on('exit', function () {
        process.exit(exitCode);
    });
};
//# sourceMappingURL=index.js.map
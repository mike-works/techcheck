"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("./enums/platform");
var DEFAULT_ENVIRONMENT_OPTIONS = {
    platform: platform_1.getPlatform()
};
var Environment = /** @class */ (function () {
    function Environment(opts) {
        if (opts === void 0) { opts = {}; }
        this.options = {
            platform: typeof opts.platform === 'undefined'
                ? DEFAULT_ENVIRONMENT_OPTIONS.platform
                : opts.platform
        };
        if (this.options.platform === platform_1.default.Unsupported)
            throw new Error("Unsupported platform: " + platform_1.default[this.options.platform]);
        this.platform = this.options.platform;
    }
    return Environment;
}());
exports.default = Environment;
//# sourceMappingURL=environment.js.map
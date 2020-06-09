"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const Result_1 = require("./Result");
const logger_1 = require("../../lib/logger");
var AppError;
(function (AppError) {
    class UnexpectedError extends Result_1.Result {
        constructor(err) {
            super(false, {
                message: `An unexpected error occurred.`,
                error: err
            });
            logger_1.logger.warn(`[AppError]: An unexpected error occurred`);
            logger_1.logger.warn(err);
        }
        static create(err) {
            return new UnexpectedError(err);
        }
    }
    AppError.UnexpectedError = UnexpectedError;
})(AppError = exports.AppError || (exports.AppError = {}));
//# sourceMappingURL=AppError.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCaseErrors = void 0;
const Result_1 = require("../../../../shared/core/Result");
var LoginUseCaseErrors;
(function (LoginUseCaseErrors) {
    class UserNameDoesntExistError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Username or password incorrect.`
            });
        }
    }
    LoginUseCaseErrors.UserNameDoesntExistError = UserNameDoesntExistError;
    class PasswordDoesntMatchError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Password doesnt match error.`
            });
        }
    }
    LoginUseCaseErrors.PasswordDoesntMatchError = PasswordDoesntMatchError;
})(LoginUseCaseErrors = exports.LoginUseCaseErrors || (exports.LoginUseCaseErrors = {}));
//# sourceMappingURL=LoginErrors.js.map
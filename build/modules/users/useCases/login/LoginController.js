"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const LoginErrors_1 = require("./LoginErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class LoginController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const dto = req.body;
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case LoginErrors_1.LoginUseCaseErrors.UserNameDoesntExistError:
                        return this.notFound(res, error.errorValue().message);
                    case LoginErrors_1.LoginUseCaseErrors.PasswordDoesntMatchError:
                        return this.clientError(res, error.errorValue().message);
                    default:
                        return this.fail(res, error.errorValue().message);
                }
            }
            else {
                const dto = result.value.getValue();
                return this.ok(res, dto);
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map
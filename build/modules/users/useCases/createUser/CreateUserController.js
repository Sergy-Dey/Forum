"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserErrors_1 = require("./CreateUserErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const TextUtils_1 = require("../../../../shared/utils/TextUtils");
class CreateUserController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        let dto = req.body;
        dto = {
            username: TextUtils_1.TextUtils.sanitize(dto.username),
            email: TextUtils_1.TextUtils.sanitize(dto.email),
            password: dto.password
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreateUserErrors_1.CreateUserErrors.UsernameTakenError:
                        return this.conflict(error.errorValue().message);
                    case CreateUserErrors_1.CreateUserErrors.EmailAlreadyExistsError:
                        return this.conflict(error.errorValue().message);
                    default:
                        return this.fail(res, error.errorValue().message);
                }
            }
            else {
                return this.ok(res);
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUserController.js.map
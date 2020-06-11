"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserErrors_1 = require("./DeleteUserErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class DeleteUserController extends BaseController_1.BaseController {
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
                    case DeleteUserErrors_1.DeleteUserErrors.UserNotFoundError:
                        return this.notFound(error.errorValue().message);
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
exports.DeleteUserController = DeleteUserController;
//# sourceMappingURL=DeleteUserController.js.map
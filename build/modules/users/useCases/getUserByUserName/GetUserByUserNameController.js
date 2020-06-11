"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByUserNameController = void 0;
const GetUserByUserNameErrors_1 = require("./GetUserByUserNameErrors");
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const userMap_1 = require("../../mappers/userMap");
class GetUserByUserNameController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const dto = req.body.decoded;
        console.log(dto);
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case GetUserByUserNameErrors_1.GetUserByUserNameErrors.UserNotFoundError:
                        return this.notFound(res, error.errorValue().message);
                    default:
                        return this.fail(res, error.errorValue().message);
                }
            }
            else {
                return this.ok(res, {
                    user: userMap_1.UserMap.toDTO(result.value.getValue())
                });
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.GetUserByUserNameController = GetUserByUserNameController;
//# sourceMappingURL=GetUserByUserNameController.js.map
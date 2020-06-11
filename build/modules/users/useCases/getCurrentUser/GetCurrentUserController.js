"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const userMap_1 = require("../../mappers/userMap");
class GetCurrentUserController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const { username } = req.body.decoded;
        try {
            const result = await this.useCase.execute({ username });
            if (result.isLeft()) {
                return this.fail(res, result.value.errorValue().message);
            }
            else {
                const user = result.value.getValue();
                return this.ok(res, {
                    user: userMap_1.UserMap.toDTO(user)
                });
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.GetCurrentUserController = GetCurrentUserController;
//# sourceMappingURL=GetCurrentUserController.js.map
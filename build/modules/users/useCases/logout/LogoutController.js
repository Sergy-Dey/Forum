"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class LogoutController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const { userId } = req.body.decoded;
        try {
            const result = await this.useCase.execute({ userId });
            if (result.isLeft()) {
                return this.fail(res, result.value.errorValue().message);
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
exports.LogoutController = LogoutController;
//# sourceMappingURL=LogoutController.js.map
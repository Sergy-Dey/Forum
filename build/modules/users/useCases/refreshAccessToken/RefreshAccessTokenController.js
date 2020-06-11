"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAccessTokenController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
const RefreshAccessTokenErrors_1 = require("./RefreshAccessTokenErrors");
class RefreshAccessTokenController extends BaseController_1.BaseController {
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
                    case RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.RefreshTokenNotFound:
                        return this.notFound(res, error.errorValue().message);
                    case RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.UserNotFoundOrDeletedError:
                        return this.notFound(res, error.errorValue().message);
                    default:
                        return this.fail(res, error.errorValue().message);
                }
            }
            else {
                const accessToken = result.value.getValue();
                return this.ok(res, {
                    refreshToken: dto.refreshToken,
                    accessToken: accessToken
                });
            }
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.RefreshAccessTokenController = RefreshAccessTokenController;
//# sourceMappingURL=RefreshAccessTokenController.js.map
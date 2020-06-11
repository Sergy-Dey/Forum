"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const logger_1 = require("../../../../lib/logger");
class BaseController {
    async execute(req, res) {
        try {
            await this.executeImpl(req, res);
        }
        catch (err) {
            logger_1.logger.info(`[BaseController]: Uncaught controller error`);
            logger_1.logger.info(err);
            this.fail(res, 'An unexpected error occurred');
        }
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message });
    }
    ok(res, dto) {
        if (!!dto) {
            res.type('application/json');
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    static created(res) {
        return res.sendStatus(201);
    }
    clientError(res, message) {
        return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
    }
    static unauthorized(res, message) {
        return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
    }
    static paymentRequired(res, message) {
        return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
    }
    static forbidden(res, message) {
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
    }
    notFound(res, message) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }
    conflict(res, message) {
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
    }
    static tooMany(res, message) {
        return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
    }
    static todo(res) {
        return BaseController.jsonResponse(res, 400, 'TODO');
    }
    fail(res, error) {
        logger_1.logger.error(error);
        return res.status(500).json({
            message: error.toString()
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map
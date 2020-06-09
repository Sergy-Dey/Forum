"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const createUser_1 = require("../../../useCases/createUser");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.post('/', (req, res) => createUser_1.createUserController.execute(req, res));
//# sourceMappingURL=index.js.map
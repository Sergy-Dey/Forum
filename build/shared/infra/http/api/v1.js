"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express = require("express");
const routes_1 = require("../../../../modules/users/infra/http/routes");
const v1Router = express.Router();
exports.v1Router = v1Router;
v1Router.use('/users', routes_1.userRouter);
v1Router.get('/', (req, res) => {
    return res.json({ message: "Success /api/v1" });
});
//# sourceMappingURL=v1.js.map
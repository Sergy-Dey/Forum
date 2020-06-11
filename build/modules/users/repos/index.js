"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const mongoUserRepo_1 = require("./implementations/mongoUserRepo");
const models = require("../../../shared/infra/database/mongodb/models");
const userRepo = new mongoUserRepo_1.MongoUserRepo(models);
exports.userRepo = userRepo;
//# sourceMappingURL=index.js.map
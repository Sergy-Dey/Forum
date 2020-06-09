"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = exports.createUserController = void 0;
const CreateUserController_1 = require("./CreateUserController");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
const repos_1 = require("../../repos");
const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(repos_1.userRepo);
exports.createUserUseCase = createUserUseCase;
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;
//# sourceMappingURL=index.js.map
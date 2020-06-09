"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepo = void 0;
const userMap_1 = require("../../mappers/userMap");
class MongoUserRepo {
    constructor(models) {
        this.models = models;
    }
    async exists(userEmail) {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({ user_email: userEmail.value });
        return !!baseUser === true;
    }
    async save(user) {
        const UserModel = this.models.BaseUser;
        const exists = await this.exists(user.email);
        if (!exists) {
            const rawSequelizeUser = await userMap_1.UserMap.toPersistence(user);
            await UserModel.create(rawSequelizeUser);
        }
        return;
    }
}
exports.MongoUserRepo = MongoUserRepo;
//# sourceMappingURL=mongoUserRepo.js.map
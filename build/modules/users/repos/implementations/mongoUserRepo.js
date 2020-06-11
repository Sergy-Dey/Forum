"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepo = void 0;
const userName_1 = require("../../domain/userName");
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
    async getUserByUserName(userName) {
        const UserModel = this.models.BaseUser;
        const userNameBase = userName instanceof userName_1.UserName
            ? userName.value
            : userName;
        const baseUser = await UserModel.findOne({
            username: userNameBase
        });
        if (!!baseUser === false)
            throw new Error("User not found.");
        return userMap_1.UserMap.toDomain(baseUser);
    }
    async getUserByUserId(userId) {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            base_user_id: userId
        });
        if (!!baseUser === false)
            throw new Error("User not found.");
        return userMap_1.UserMap.toDomain(baseUser);
    }
}
exports.MongoUserRepo = MongoUserRepo;
//# sourceMappingURL=mongoUserRepo.js.map
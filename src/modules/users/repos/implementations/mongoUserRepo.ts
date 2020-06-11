import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";

export class MongoUserRepo implements IUserRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async exists (userEmail: UserEmail): Promise<boolean> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({user_email: userEmail.value});
    return !!baseUser === true;
  }

  async save (user: User): Promise<void> {
    const UserModel = this.models.BaseUser;
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return;
  }

  async getUserByUserName (userName: UserName | string): Promise<User>{
    const UserModel = this.models.BaseUser;
    const userNameBase = userName instanceof UserName
      ? (<UserName>userName).value
      : userName;

    const baseUser = await UserModel.findOne({
      username: userNameBase
    });

    if (!!baseUser === false) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId (userId: string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
        base_user_id: userId
    });

    if (!!baseUser === false) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }
}

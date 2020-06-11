
import { MongoUserRepo } from "./implementations/mongoUserRepo";
import * as models from "../../../shared/infra/database/mongodb/models";

const userRepo = new MongoUserRepo(models);

export { userRepo }

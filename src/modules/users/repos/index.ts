import {MongoUserRepo} from "./implementations/mongoUserRepo";
import {BaseUser} from '../../../shared/infra/database/mongodb/models';

const userRepo = new MongoUserRepo({BaseUser});

export { userRepo }

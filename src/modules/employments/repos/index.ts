import {MongoEmployeesRepo} from './implementations/mongoEmployeesRepo';
import * as models from "../../../shared/infra/database/mongodb/models";

const employeesRepo = new MongoEmployeesRepo(models);

export { employeesRepo   }

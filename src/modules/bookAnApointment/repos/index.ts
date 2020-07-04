import { BookAnApointmantRepo} from './implementations/mongoBookAnApointmanRepo';
import * as models from "../../../shared/infra/database/mongodb/models";

const bookAnApointmantRepo = new BookAnApointmantRepo(models);

export { bookAnApointmantRepo }

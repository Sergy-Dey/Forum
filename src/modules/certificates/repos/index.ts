import {MongoCertificateRepo} from './implementations/mongoCertificateRepo';
import * as models from "../../../shared/infra/database/mongodb/models";

const certificateRepo = new MongoCertificateRepo(models);

export { certificateRepo }

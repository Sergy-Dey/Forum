import {MongoPricingRepo} from './implementations/mongoPricingRepo';
import * as models from "../../../shared/infra/database/mongodb/models";

const pricingRepo = new MongoPricingRepo(models);

export { pricingRepo  }

import * as express from 'express';
import {createPricingController} from '../../../useCases/createPricing';
import {getPricingController} from '../../../useCases/getPricing';
import {deletePricingController} from '../../../useCases/deletePricing';

const pricingRouter = express.Router();


pricingRouter.post('/', (req, res) =>{
  return createPricingController.execute(req, res)
});

pricingRouter.get('/', (req, res) =>
  getPricingController.execute(req, res)
);

pricingRouter.delete('/', (req, res) =>
  deletePricingController.execute(req, res)
);
//
// pricingRouter.put('/:id', (req, res) => {
//
// });

export { pricingRouter };

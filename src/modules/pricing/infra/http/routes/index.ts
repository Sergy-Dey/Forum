import * as express from 'express';
import {createPricingController} from '../../../useCases/createPricing';

const pricingRouter = express.Router();


pricingRouter.post('/', (req, res) =>{
  console.log("Route use")
  return createPricingController.execute(req, res)
});

// pricingRouter.get('/', (req, res) => {
//
// });
//
//
// pricingRouter.delete('/:id', (req, res) => {
//
// });
//
// pricingRouter.put('/:id', (req, res) => {
//
// });

export { pricingRouter };

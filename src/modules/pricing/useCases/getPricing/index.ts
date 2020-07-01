import {GetPricing} from './GetPricing';
import {GetPricingController} from './GetPricingController';
import {pricingRepo } from '../../repos';

const getPricing = new GetPricing(pricingRepo);

const getPricingController = new GetPricingController(getPricing);

export {
  getPricing,
  getPricingController
}

import {CreatePricingUseCase} from './CreatePricingUseCase';
import {CreatePricingController} from './CreatePricingController';
import {pricingRepo} from '../../repos';

const createPricingUseCase = new CreatePricingUseCase(pricingRepo);
const createPricingController = new CreatePricingController(createPricingUseCase);

export {
  createPricingUseCase,
  createPricingController
}

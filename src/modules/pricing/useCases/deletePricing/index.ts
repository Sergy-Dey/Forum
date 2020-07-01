import {pricingRepo} from '../../repos';
import {DeletePricingUseCase} from './DeletePricingUseCase';
import {DeletePricingController} from './DeletePricingController';

const deletePricingUseCase = new DeletePricingUseCase(pricingRepo);
const deletePricingController = new DeletePricingController(deletePricingUseCase);

export {
  deletePricingUseCase,
  deletePricingController,
}

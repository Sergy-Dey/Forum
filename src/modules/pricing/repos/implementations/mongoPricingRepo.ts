import { IPricingRepo } from '../pricingRepo';
import { PricingMap } from '../../mappers/pricingMap';
import { Pricing } from '../../domain/pricing';
import { PricingServiceName } from '../../domain/pricingServiceName';

export class MongoPricingRepo implements IPricingRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async exists (pricingServiceName: PricingServiceName): Promise<boolean> {
    const BasePricingModel = this.models.BasePricing;
    const basePricing = await BasePricingModel.findOne({user_email: pricingServiceName.value});
    return !!basePricing === true;
  }

  async save (pricingServiceName: Pricing): Promise<void> {
    const PricingModel = this.models.BasePricing;
    const exists = await this.exists(pricingServiceName.serviceName);

    if (!exists) {
      const rawSMongoosePricing = await PricingMap.toPersistence(pricingServiceName);
      await PricingModel.create(rawSMongoosePricing);
    }

    return;
  }

  async getPricing(): Promise<any>{
    const BasePricingModel = this.models.BasePricing;
    const basePricing = await BasePricingModel.findAll();

    return basePricing.map(item => {
      return PricingMap.toPersistence(item);
    });
  }
}

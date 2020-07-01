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

  async save (pricingServiceName: Pricing): Promise<any> {
    const PricingModel = this.models.BasePricing;
    const exists = await this.exists(pricingServiceName.serviceName);

    if (!exists) {
      const rawSMongoosePricing = await PricingMap.toPersistence(pricingServiceName);
      const res = await PricingModel.create(rawSMongoosePricing);

      return {
        base_pricing_id: res.base_pricing_id,
        serviceName: res.serviceName,
        price: res.price,
        stage: res.stage,
      };
    }
  }

  async getPricing(): Promise<any>{
    const BasePricingModel = this.models.BasePricing;
    return await BasePricingModel.find();
  }

  public delete = async (pricingIds: string[]): Promise<void> => {
    const BasePricingModel = this.models.BasePricing;

    const promise = pricingIds.map(id=>{
      return BasePricingModel.findOneAndRemove({base_pricing_id: id})
    });

    await Promise.all(promise);
  }
}

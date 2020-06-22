import { Mapper } from '../../../shared/infra/Mapper';
import {Pricing} from '../domain/pricing';
import {PricingDTO} from '../dtos/userDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import {PricingPrice} from '../domain/pricingPrice';
import {PricingServiceName} from '../domain/pricingServiceName';
import {PricingStage} from '../domain/pricingStage';

export class PricingMap implements Mapper<Pricing> {
  public static toDTO (pricing: Pricing): PricingDTO {
    return {
      serviceName: pricing.serviceName.value,
      price: pricing.price.value,
      stage: pricing.stage.value,
    }
  }

  public static toDomain (raw: any): Pricing {
    const pricingServiceNameOrError = PricingServiceName.create({ serviceName: raw.serviceName });
    const pricingPricedOrError = PricingPrice.create({ price: raw.price});
    const pricingStage = PricingStage.create({stage: raw.stage});

    const pricingOrError = Pricing.create({
      serviceName: pricingServiceNameOrError.getValue(),
      price: pricingPricedOrError.getValue(),
      stage: pricingStage.getValue(),
    }, new UniqueEntityID(raw.base_pricing_id));

    pricingOrError.isFailure ? console.log(pricingOrError.error) : '';

    return pricingOrError.isSuccess ? pricingOrError.getValue() : null;
  }

  public static async toPersistence (pricing: Pricing): Promise<any> {
    return {
      base_pricing_id: pricing.id.toString(),
      serviceName: pricing.serviceName.value,
      price: pricing.price.value,
      stage: pricing.stage.value,
    }
  }
}

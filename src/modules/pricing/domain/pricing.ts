import {PricingId} from './pricingId';
import {PricingPrice} from './pricingPrice';
import {PricingServiceName} from './pricingServiceName';
import {PricingStage} from './pricingStage';
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import {PricingCreated} from './events/pricingCreated';

interface PricingProps {
  serviceName: PricingServiceName;
  stage: PricingStage;
  price: PricingPrice;
}

export class Pricing extends AggregateRoot<PricingProps> {
  get priceId (): PricingId {
    return PricingId.create(this._id).getValue();
  }

  get price(): PricingPrice {
    return this.props.price;
  }

  get stage(): PricingStage {
    return this.props.stage;
  }

  get serviceName(): PricingServiceName {
    return this.props.serviceName;
  }

  private constructor (props: PricingProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: PricingProps, id?: UniqueEntityID): Result<Pricing> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.serviceName, argumentName: 'serviceName' },
      { argument: props.price, argumentName: 'price' },
      { argument: props.stage, argumentName: 'stage' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Pricing>(guardResult.message)
    }

    const isNewPricing = !!id === false;
    const pricing = new Pricing({
      ...props,
    }, id);

    if (isNewPricing) {
      pricing.addDomainEvent(new PricingCreated(pricing));
    }

    return Result.ok<Pricing>(pricing);
  }
}

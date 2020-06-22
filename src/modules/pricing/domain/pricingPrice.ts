import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface PricingPriceProps {
  price: number;
}

export class PricingPrice extends ValueObject<PricingPriceProps> {
  public static maxCost: number = 1000000;
  public static minCost: number = 0;

  get value (): number {
    return this.props.price;
  }

  private constructor (props: PricingPriceProps) {
    super(props);
  }

  public static create (props: PricingPriceProps): Result<PricingPrice> {
    const priceResult = Guard.againstNullOrUndefined(props.price, 'price');
    if (!priceResult.succeeded) {
      return Result.fail<PricingPrice>(priceResult.message)
    }

    const minLengthResult = Guard.greaterThan(this.minCost, props.price);
    if (!minLengthResult.succeeded) {
      return Result.fail<PricingPrice>(minLengthResult.message)
    }

    const maxLengthResult = Guard.lessThen(this.maxCost, props.price);
    if (!maxLengthResult.succeeded) {
      return Result.fail<PricingPrice>(minLengthResult.message)
    }

    return Result.ok<PricingPrice>(new PricingPrice(props));
  }
}

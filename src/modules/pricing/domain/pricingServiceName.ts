import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface PricingServiceNameProps {
  serviceName: string;
}

export class PricingServiceName extends ValueObject<PricingServiceNameProps> {
  public static maxLength: number = 300;
  public static minLength: number = 5;

  get value (): string {
    return this.props.serviceName;
  }

  private constructor (props: PricingServiceNameProps) {
    super(props);
  }

  public static create (props: PricingServiceNameProps): Result<PricingServiceName> {
    const usernameResult = Guard.againstNullOrUndefined(props.serviceName, 'serviceName');
    if (!usernameResult.succeeded) {
      return Result.fail<PricingServiceName>(usernameResult.message)
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.serviceName);
    if (!minLengthResult.succeeded) {
      return Result.fail<PricingServiceName>(minLengthResult.message)
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.serviceName);
    if (!maxLengthResult.succeeded) {
      return Result.fail<PricingServiceName>(minLengthResult.message)
    }

    return Result.ok<PricingServiceName>(new PricingServiceName(props));
  }
}

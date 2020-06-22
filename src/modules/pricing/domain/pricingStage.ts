import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface PricingStageProps {
  stage: string;
}

export class PricingStage extends ValueObject<PricingStageProps> {
  public static maxLength: number = 50;
  public static minLength: number = 2;

  get value (): string {
    return this.props.stage;
  }

  private constructor (props: PricingStageProps) {
    super(props);
  }

  public static create (props: PricingStageProps): Result<PricingStage> {
    const usernameResult = Guard.againstNullOrUndefined(props.stage, 'stage');
    if (!usernameResult.succeeded) {
      return Result.fail<PricingStage>(usernameResult.message)
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.stage);
    if (!minLengthResult.succeeded) {
      return Result.fail<PricingStage>(minLengthResult.message)
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.stage);
    if (!maxLengthResult.succeeded) {
      return Result.fail<PricingStage>(minLengthResult.message)
    }

    return Result.ok<PricingStage>(new PricingStage(props));
  }
}

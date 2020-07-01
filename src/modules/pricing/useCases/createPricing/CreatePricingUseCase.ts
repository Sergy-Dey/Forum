import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import { UseCase } from "../../../../shared/core/UseCase";
import {CreatePricingDTO} from './CreatePricingDTO';
import {CreatePricingErrors} from './CreatePricingErrors';
import {IPricingRepo} from '../../repos/pricingRepo';
import {Pricing} from '../../domain/pricing';
import {PricingServiceName} from '../../domain/pricingServiceName';
import {PricingStage} from '../../domain/pricingStage';
import {PricingPrice} from '../../domain/pricingPrice';

type Response = Either<
  CreatePricingErrors.ServiceNameExistsError |
  AppError.UnexpectedError,
  Result<any>
>
export class CreatePricingUseCase implements UseCase<CreatePricingDTO, Promise<Response>> {
  private pricingRepo: IPricingRepo;

  constructor (pricingRepo: IPricingRepo) {
    this.pricingRepo = pricingRepo;
  }

  async execute(request: CreatePricingDTO): Promise<Response>{
    const serviceNameOrError = PricingServiceName.create({serviceName: request.serviceName});
    const priceOrError = PricingPrice.create({price: request.price});
    const stageOrError = PricingStage.create({stage: request.stage});

    const dtoResult = Result.combine([
      serviceNameOrError, priceOrError, stageOrError
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as Response;
    }

    const serviceName: PricingServiceName = serviceNameOrError.getValue();
    const price: PricingPrice = priceOrError.getValue();
    const stage: PricingStage = stageOrError.getValue();

    try{
      const serviceNameAlreadyExists = await this.pricingRepo.exists(serviceName);

      if (serviceNameAlreadyExists) {
        return left(
          new CreatePricingErrors.ServiceNameExistsError(serviceName.value)
        ) as Response;
      }

      const pricingOrError: Result<Pricing> = Pricing.create({
        serviceName, price, stage,
      });

      if (pricingOrError.isFailure) {
        return left(
          Result.fail<Pricing>(pricingOrError.error.toString())
        ) as Response;
      }

      const pricing: Pricing = pricingOrError.getValue();

      const res = await this.pricingRepo.save(pricing);

      return right(Result.ok<any>(res))
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}

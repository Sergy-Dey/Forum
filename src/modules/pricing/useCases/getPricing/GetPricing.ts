import { Either, left, Result } from '../../../../shared/core/Result';
import { Pricing } from '../../domain/pricing';
import { UseCase } from '../../../../shared/core/UseCase';
import { AppError } from '../../../../shared/core/AppError';
import { IPricingRepo } from '../../repos/pricingRepo';

type Response = Either<
  AppError.UnexpectedError,
  Result<Pricing> | any
>

export class GetPricing implements UseCase<any, Promise<Response>> {

  private pricingRepo: IPricingRepo;

  constructor(pricingRepo: IPricingRepo){
    this.pricingRepo = pricingRepo;
  }

  public async execute (request: any): Promise<Response> {
    try{
      return await this.pricingRepo.getPricing();
    } catch (err) {
      return left(
        new AppError.UnexpectedError(err)
      ) as Response
    }
  }
}

import {DeletePricingDTO} from './DeletePricingDTO';
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { AppError } from "../../../../shared/core/AppError";
import {IPricingRepo} from '../../repos/pricingRepo';
import { UseCase } from "../../../../shared/core/UseCase";

type Response = Either<
  AppError.UnexpectedError,
  Result<void>
>

export class DeletePricingUseCase implements UseCase<DeletePricingDTO, Promise<Response>>{
  private pricingRepo: IPricingRepo;

  constructor(pricingRepo: IPricingRepo){
    this.pricingRepo = pricingRepo;
  }

  public async execute (request: DeletePricingDTO): Promise<any>{
    try{
      await this.pricingRepo.delete(request.id);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

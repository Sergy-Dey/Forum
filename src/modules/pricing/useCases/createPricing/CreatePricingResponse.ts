import { Either, Result } from "../../../../shared/core/Result";
import { CreatePricingErrors } from "./CreatePricingErrors";
import { AppError } from "../../../../shared/core/AppError";

export type CreatePricingResponse = Either<
  CreatePricingErrors.ServiceNameExistsError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

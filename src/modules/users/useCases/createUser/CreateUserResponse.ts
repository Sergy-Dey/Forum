import { Either, Result } from "../../../../shared/core/Result";
import { CreateUserErrors } from "./CreateUserErrors";
import { AppError } from "../../../../shared/core/AppError";

export type CreateUserResponse = Either<
    CreateUserErrors.UsernameTakenError |
    CreateUserErrors.EmailAlreadyExistsError |
    AppError.UnexpectedError |
    Result<any>,
    Result<void>
>
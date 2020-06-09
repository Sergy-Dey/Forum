import { Result } from './Result';
import { UseCaseError } from './UseCaseError';
import {logger} from '../../lib/logger';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError>{
    public constructor(err: any){
      super(false, {
        message: `An unexpected error occurred.`,
        error: err
      } as UseCaseError);

      logger.warn(`[AppError]: An unexpected error occurred`);
      logger.warn(err);
    }

    public static create (err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}

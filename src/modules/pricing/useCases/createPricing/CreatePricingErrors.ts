
import { UseCaseError } from "../../../../shared/core/UseCaseError"
import { Result } from "../../../../shared/core/Result"

export namespace CreatePricingErrors {
  export class ServiceNameExistsError extends Result<UseCaseError> {
    constructor (serviceName: string) {
      super(false, {
        message: `The serviceName ${serviceName} associated for this account already exists`
      } as UseCaseError)
    }
  }
}

import * as express from 'express'
import {CreatePricingUseCase} from './CreatePricingUseCase';
import {CreatePricingDTO} from './CreatePricingDTO';
import {CreatePricingErrors} from './CreatePricingErrors';
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import {DecodedExpressRequest} from '../../../users/infra/http/models/decodedRequest';
import { CreateUserErrors } from '../../../users/useCases/createUser/CreateUserErrors';

export class CreatePricingController extends BaseController {
  private useCase: CreatePricingUseCase;

  constructor (useCase: CreatePricingUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    let dto: CreatePricingDTO = req.body as CreatePricingDTO;

    dto = {
      serviceName: dto.serviceName,
      price: dto.price,
      stage: dto.stage,
    };

    try{
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreatePricingErrors.ServiceNameExistsError:
            return this.conflict(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }

      }

      if(result.isRight()){
        const obj = result.value;
        // @ts-ignore
        return this.ok<any>(res, obj._value);
      }

      return this.ok(res);
    } catch (err) {
      return this.fail(res, err)
    }
  }
}

import {DeletePricingDTO} from './DeletePricingDTO';
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import * as express from 'express';
import {DeletePricingUseCase} from './DeletePricingUseCase';

export class DeletePricingController extends BaseController{
  private useCase: DeletePricingUseCase;

  constructor(useCase: DeletePricingUseCase){
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any>{
    const dto: DeletePricingDTO = req.body;
   
    try{
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        return this.fail(res, error.errorValue().message);
      }

      return this.ok(res);

    }catch (error) {
      return this.fail(res, error);
    }
  }
}


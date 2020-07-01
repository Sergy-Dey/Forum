import * as express from 'express';
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import {GetPricing} from './GetPricing';
import { PricingMap } from '../../mappers/pricingMap';


export class GetPricingController extends BaseController{
  private useCase: GetPricing;

  constructor(useCase: GetPricing){
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: any, res: express.Response): Promise<any>{
    try{
      const result = await this.useCase.execute(req.body);

      return this.ok(res, {
        pricing: Array.isArray(result) ? result.map(item => PricingMap.toDTO(item)) : result
      })
    } catch (err) {
      return this.fail(res, err);
    }
  }
}

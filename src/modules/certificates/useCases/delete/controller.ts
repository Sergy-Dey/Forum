import * as express from 'express';
import {ICertificateRepo} from '../../repos/certificateRepo';

export class DeleteCertificateController {
  private certificateRepo: ICertificateRepo;

  constructor (certificateRepo: ICertificateRepo) {
    this.certificateRepo = certificateRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {

      const result = await this.certificateRepo.delete(req.body.id);

      if(result){
        res.type('application/json');
        return res.status(200).json({
          success: true
        });
      } else {
        res.type('application/json');
        return res.status(200).json({
          success: false
        });
      }

    }catch (e) {
      console.log("Error Certificate in controller Delete");
      throw new Error(e)
    }
  }
}

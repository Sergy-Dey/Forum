import * as express from 'express';
import {ICertificateRepo} from '../../repos/certificateRepo';

export class GetCertificateController {
  private certificateRepo: ICertificateRepo;

  constructor (certificateRepo: ICertificateRepo) {
    this.certificateRepo = certificateRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      const result = await this.certificateRepo.getAll();
      res.type('application/json');
      return res.status(200).json(result);
    }catch (e) {
      console.log("Error Certificate in controller Create");
      throw new Error(e)
    }
  }
}

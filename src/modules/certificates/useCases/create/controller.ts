import * as express from 'express';
import {ICertificateDTO} from '../../dtos/certificateDTO';
import {ICertificateRepo} from '../../repos/certificateRepo';

export class CreteCertificateController {
  private certificateRepo: ICertificateRepo;

  constructor (certificateRepo: ICertificateRepo) {
    this.certificateRepo = certificateRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      // @ts-ignore
      const bitmapBuff = Buffer.from(req.files.file.data).toString('base64');
      const dto = {
        title: req.body.title,
        image: bitmapBuff,
      } as ICertificateDTO;


      await this.certificateRepo.save(dto);
      res.type('application/json');
      return res.status(200).json({
        success: true
      });
    }catch (e) {
      console.log("Error Certificate in controller Create");
      throw new Error(e)
    }
  }
}

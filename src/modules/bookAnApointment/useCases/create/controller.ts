import {BookAnApointmantDTO} from '../../dto/bookAnApointmantDTO';
import {IBookAnApointmantRepo} from '../../repos/bookAnApointmantRepo';
import * as express from 'express'

export class CreteBookAnApointmantController {
  private bookRepo: IBookAnApointmantRepo;

  constructor (bookRepo: IBookAnApointmantRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      const dto = req.body as BookAnApointmantDTO;
      await this.bookRepo.save(dto);
      res.type('application/json');
      return res.status(200).json(dto);
    }catch (e) {
      console.log("Error in controller Create");
      throw new Error(e)
    }
  }
}

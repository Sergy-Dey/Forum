import {IBookAnApointmantRepo} from '../../repos/bookAnApointmantRepo';
import * as express from 'express'

export class DeleteBookAnApointmantController {
  private bookRepo: IBookAnApointmantRepo;

  constructor (bookRepo: IBookAnApointmantRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      const ids = req.body.id as string[];
      console.log(ids);

      await this.bookRepo.delete(ids);

      return res.status(200).send(true);
    }catch (e) {
      console.log("Error in controller Delete");
      throw new Error(e)
    }
  }
}

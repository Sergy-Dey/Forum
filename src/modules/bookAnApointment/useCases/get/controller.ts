import {BookAnApointmantDTO} from '../../dto/bookAnApointmantDTO';
import {IBookAnApointmantRepo} from '../../repos/bookAnApointmantRepo';
import * as express from 'express'

export class GetBookAnApointmantController {
  private bookRepo: IBookAnApointmantRepo;

  constructor (bookRepo: IBookAnApointmantRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      const data = await this.bookRepo.get();

      const result = data.map(el => {
        return {
          id: el._id,
          fio: el.fio,
          email: el.email,
          comment: el.comment,
        }
      });

      res.type('application/json');
      return res.status(200).json(result);
    }catch (e) {
      console.log("Error in controller Get");
      throw new Error(e)
    }
  }
}

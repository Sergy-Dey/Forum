import * as express from 'express';
import {IEmployeesDTO} from '../../dtos/employeesDTO';
import {IEmployeesRepo} from '../../repos/employeesRepo';
import { BookAnApointmantDTO } from '../../../bookAnApointment/dto/bookAnApointmantDTO';

export class CreteEmployeesController {
  private employeesRepo: IEmployeesRepo;

  constructor (employeesRepo: IEmployeesRepo) {
    this.employeesRepo = employeesRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      // @ts-ignore
      const bitmapBuff = Buffer.from(req.files.file.data).toString('base64');
      const dto = {
        fio: req.body.fio,
        email: req.body.email,
        position: req.body.position,
        avatar: bitmapBuff,
      } as IEmployeesDTO;

      // console.log(dto);
      await this.employeesRepo.save(dto);
      res.type('application/json');
      return res.status(200).json({
        success: true
      });
    }catch (e) {
      console.log("Error Employees in controller Create");
      throw new Error(e)
    }
  }
}

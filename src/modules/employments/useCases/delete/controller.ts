import * as express from 'express';
import {IEmployeesDTO} from '../../dtos/employeesDTO';
import {IEmployeesRepo} from '../../repos/employeesRepo';
import { BookAnApointmantDTO } from '../../../bookAnApointment/dto/bookAnApointmantDTO';

export class DeleteEmployeesController {
  private employeesRepo: IEmployeesRepo;

  constructor (employeesRepo: IEmployeesRepo) {
    this.employeesRepo = employeesRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {

      const result = await this.employeesRepo.delete(req.body.id);

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
      console.log("Error Employees in controller Delete");
      throw new Error(e)
    }
  }
}

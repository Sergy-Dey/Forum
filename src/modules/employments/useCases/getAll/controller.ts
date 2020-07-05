import * as express from 'express';
import {IEmployeesDTO} from '../../dtos/employeesDTO';
import {IEmployeesRepo} from '../../repos/employeesRepo';
import { BookAnApointmantDTO } from '../../../bookAnApointment/dto/bookAnApointmantDTO';

export class GetEmployeesController {
  private employeesRepo: IEmployeesRepo;

  constructor (employeesRepo: IEmployeesRepo) {
    this.employeesRepo = employeesRepo;
  }

  async execute(req: express.Request, res: express.Response): Promise<any>{
    try {
      const result = await this.employeesRepo.getAll();
      res.type('application/json');
      return res.status(200).json(result);
    }catch (e) {
      console.log("Error Employees in controller Create");
      throw new Error(e)
    }
  }
}

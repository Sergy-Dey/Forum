import {IEmployeesRepo} from '../employeesRepo';
import { IEmployeesDTO } from '../../dtos/employeesDTO';

export class MongoEmployeesRepo implements IEmployeesRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async getAll():Promise<any>{
    try {
      const BaseEmployeesModel = this.models.BaseEmployees;
      return await BaseEmployeesModel.find();
    } catch (error) {
      console.log("Error on Repo Employees GetAll");
      throw new Error(error);
    }
  }

  async save(user: IEmployeesDTO): Promise<any>{
    try {
      const BaseEmployeesModel = this.models.BaseEmployees;
      return await BaseEmployeesModel.create(user);
    } catch (error) {
      console.log("Error on Repo Employees GetAll");
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<boolean>{
    try {
      const BaseEmployeesModel = this.models.BaseEmployees;

      await BaseEmployeesModel.findOneAndRemove({_id: id});

      return true;
    } catch (error) {
      console.log("Error on Repo Employees GetAll");
      throw new Error(error);
    }
  }
}

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

  async delete(ids: string[]): Promise<any>{
    try {
      const BaseEmployeesModel = this.models.BaseEmployees;

      const promise = ids.map(id=>{
        return BaseEmployeesModel.findOneAndRemove({_id: id})
      });

      await Promise.all(promise);
    } catch (error) {
      console.log("Error on Repo Employees GetAll");
      throw new Error(error);
    }
  }
}

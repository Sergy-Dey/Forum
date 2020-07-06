import {IEmployeesDTO} from '../dtos/employeesDTO';

export interface IEmployeesRepo {
  getAll(): Promise<any>;
  save (employees: IEmployeesDTO): Promise<any>;
  delete(id: string): Promise<boolean>;
}

import {employeesRepo} from '../../repos';
import {GetEmployeesController} from './controller';

const getEmployeesController = new GetEmployeesController(employeesRepo);

export {
  getEmployeesController
}

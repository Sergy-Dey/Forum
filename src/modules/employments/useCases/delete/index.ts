import {employeesRepo} from '../../repos';
import {DeleteEmployeesController } from './controller';

const deleteEmployeesController = new DeleteEmployeesController (employeesRepo);

export {
  deleteEmployeesController
}

import {employeesRepo} from '../../repos';
import {CreteEmployeesController} from './controller';

const creteEmployeesController = new CreteEmployeesController(employeesRepo);

export {
  creteEmployeesController
}

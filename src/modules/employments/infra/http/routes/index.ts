import * as express from 'express';
import {creteEmployeesController} from '../../../useCases/create';
import {getEmployeesController} from '../../../useCases/getAll';

const employeesRouter = express.Router();


employeesRouter.post('/', (req, res) =>
  creteEmployeesController.execute(req, res)
);

employeesRouter.get('/', (req, res) =>
  getEmployeesController.execute(req, res)
);

export { employeesRouter };

import * as express from 'express'
import {creteBookAnApointmantController} from '../../../useCases/create';
import {getBookAnApointmantController} from '../../../useCases/get';
import {deleteBookAnApointmantController} from '../../../useCases/delete';

const bookAnApointmentRouter = express.Router();

bookAnApointmentRouter.post('/', (req, res) =>
  creteBookAnApointmantController.execute(req, res)
);

bookAnApointmentRouter.get('/', (req, res) =>
  getBookAnApointmantController.execute(req, res)
);

bookAnApointmentRouter.delete('/', (req, res) =>
  deleteBookAnApointmantController.execute(req, res)
);

export {
  bookAnApointmentRouter
}

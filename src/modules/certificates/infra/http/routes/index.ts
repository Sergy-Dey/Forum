import * as express from 'express';
import {creteCertificateController} from '../../../useCases/create';
import {getCertificateController} from '../../../useCases/getAll';
import {deleteCertificateController} from '../../../useCases/delete';

const certificateRouter = express.Router();


certificateRouter.post('/', (req, res) =>
  creteCertificateController.execute(req, res)
);

certificateRouter.get('/', (req, res) =>
  getCertificateController.execute(req, res)
);

certificateRouter.delete('/', (req, res) =>
  deleteCertificateController.execute(req, res)
);
export { certificateRouter };

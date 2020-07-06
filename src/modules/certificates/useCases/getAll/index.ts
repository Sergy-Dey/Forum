import {certificateRepo} from '../../repos';
import {GetCertificateController} from './controller';

const getCertificateController = new GetCertificateController(certificateRepo);

export {
  getCertificateController
}

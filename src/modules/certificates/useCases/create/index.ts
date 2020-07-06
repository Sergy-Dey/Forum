import {certificateRepo} from '../../repos';
import {CreteCertificateController} from './controller';

const creteCertificateController = new CreteCertificateController(certificateRepo);

export {
  creteCertificateController
}

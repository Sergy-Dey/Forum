import { certificateRepo } from '../../repos';
import { DeleteCertificateController } from './controller';

const deleteCertificateController = new DeleteCertificateController(certificateRepo);

export {
  deleteCertificateController
}

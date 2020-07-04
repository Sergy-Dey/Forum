import {bookAnApointmantRepo} from '../../repos';
import {CreteBookAnApointmantController} from './controller';

const creteBookAnApointmantController = new CreteBookAnApointmantController(bookAnApointmantRepo);

export {
  creteBookAnApointmantController
}

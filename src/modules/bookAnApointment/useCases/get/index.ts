import {bookAnApointmantRepo} from '../../repos';
import {GetBookAnApointmantController} from './controller';

const getBookAnApointmantController = new GetBookAnApointmantController(bookAnApointmantRepo);

export {
  getBookAnApointmantController
}

import {bookAnApointmantRepo} from '../../repos';
import {DeleteBookAnApointmantController} from './controller';

const deleteBookAnApointmantController = new DeleteBookAnApointmantController(bookAnApointmantRepo);

export {
  deleteBookAnApointmantController
}

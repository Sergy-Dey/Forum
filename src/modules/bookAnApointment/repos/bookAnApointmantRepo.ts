import {BookAnApointmantDTO} from '../dto/bookAnApointmantDTO';

export interface IBookAnApointmantRepo {
  save (props: BookAnApointmantDTO): Promise<any>;
  get(): Promise<any>;
  delete(id: string[]): Promise<any>;
}

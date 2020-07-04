import {IBookAnApointmantRepo} from '../bookAnApointmantRepo';
import { BookAnApointmantDTO } from '../../dto/bookAnApointmantDTO';

export class BookAnApointmantRepo implements IBookAnApointmantRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async get(): Promise<any>{
    try{
      const BaseBookAnApointmantModel = this.models.BaseBookAnApointment;
      return await BaseBookAnApointmantModel.find();
    } catch (e) {
      console.log("Error BookAnApointmantRepo method get");
      throw new Error(e);
    }
  }

  async save(props: BookAnApointmantDTO): Promise<any>{
    try{
      const BaseBookAnApointmantModel = this.models.BaseBookAnApointment;
      const res = await BaseBookAnApointmantModel.create(props);
      return "Ok";
    } catch (e) {
      console.log("Error BookAnApointmantRepo method save");
      throw new Error(e);
    }
  }

  public delete = async (id: string[]): Promise<void> => {
    try{
      const BaseBookAnApointmantModel = this.models.BaseBookAnApointment;

      const promise = id.map(id=>{
        return BaseBookAnApointmantModel.findOneAndRemove({_id: id})
      });

      await Promise.all(promise);
    } catch (e) {
      console.log("Error BookAnApointmantRepo method delete");
      throw new Error(e);
    }
  }
}

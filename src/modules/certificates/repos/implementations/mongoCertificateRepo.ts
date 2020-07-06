import {ICertificateRepo} from '../certificateRepo';
import { ICertificateDTO } from '../../dtos/certificateDTO';

export class MongoCertificateRepo implements ICertificateRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  async getAll():Promise<any>{
    try {
      const BaseCertificatesModel = this.models.BaseCertificates;
      return await BaseCertificatesModel.find();
    } catch (error) {
      console.log("Error on Repo Certificates GetAll");
      throw new Error(error);
    }
  }

  async save(user: ICertificateDTO): Promise<any>{
    try {
      const BaseCertificatesModel = this.models.BaseCertificates;
      return await BaseCertificatesModel.create(user);
    } catch (error) {
      console.log("Error on Repo Certificates GetAll");
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<boolean>{
    try {
      const BaseCertificatesModel = this.models.BaseCertificates;

      await BaseCertificatesModel.findOneAndRemove({_id: id});

      return true;
    } catch (error) {
      console.log("Error on Repo Certificates Delete");
      throw new Error(error);
    }
  }
}

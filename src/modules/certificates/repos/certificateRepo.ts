import {ICertificateDTO} from '../dtos/certificateDTO';

export interface ICertificateRepo {
  getAll(): Promise<any>;
  save (certificateDTO: ICertificateDTO): Promise<any>;
  delete(id: string): Promise<boolean>;
}

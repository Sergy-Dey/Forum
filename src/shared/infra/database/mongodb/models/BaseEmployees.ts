import { Document, Schema, Model, model } from 'mongoose';

export interface BaseEmployeesInterface {
  fio: string;
  email: string;
  avatar: string;
  position: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseEmployeesDocument extends BaseEmployeesInterface, Document {}
export interface BaseEmployeesModel extends Model<BaseEmployeesDocument> {}

export const BaseEmployeesSchema: Schema = new Schema(
  {
    fio: { type: String, required: true },
    email: {type: String, default: ''},
    avatar:{type: String, default: ''},
    position: {type: String, default: ''}
  },
  {
    timestamps: true,
  },
);

export const BaseEmployees: BaseEmployeesModel = model<BaseEmployeesDocument, BaseEmployeesModel>(
  'BaseEmployees',
  BaseEmployeesSchema,
);

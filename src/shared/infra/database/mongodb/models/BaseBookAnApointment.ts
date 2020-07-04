import { Document, Schema, Model, model } from 'mongoose';

export interface BaseBookAnApointmentInterface {
  base_pricing_id: string;
  serviceName: string;
  price: number;
  stage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseBookAnApointmentDocument extends BaseBookAnApointmentInterface, Document {}
export interface BaseBookAnApointmentModel extends Model<BaseBookAnApointmentDocument> {}

export const BaseBookAnApointmentSchema: Schema = new Schema(
  {
    fio: {type: String},
    phone:{type: Number, default: false},
    email: {type: String, default: false},
    comment:{type: String, default: false},
  },
  {
    timestamps: true,
  },
);
export const BaseBookAnApointment: BaseBookAnApointmentModel = model<BaseBookAnApointmentDocument, BaseBookAnApointmentModel>(
  'BaseBookAnApointment',
  BaseBookAnApointmentSchema,
);


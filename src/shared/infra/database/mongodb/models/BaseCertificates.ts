import { Document, Schema, Model, model } from 'mongoose';

export interface BaseCertificatesInterface {
  title: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseCertificatesDocument extends BaseCertificatesInterface, Document {}
export interface BaseCertificatesModel extends Model<BaseCertificatesDocument> {}

export const BaseCertificatesSchema: Schema = new Schema(
  {
    title: { type: String, default: ''},
    image: {type: String, default: ''},
  },
  {
    timestamps: true,
  },
);

export const BaseCertificates: BaseCertificatesModel = model<BaseCertificatesDocument, BaseCertificatesModel>(
  'BaseCertificates',
  BaseCertificatesSchema,
);

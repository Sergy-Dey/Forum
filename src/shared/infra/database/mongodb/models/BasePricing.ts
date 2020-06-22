import { Document, Schema, Model, model } from 'mongoose';

export interface BasePricingInterface {
  base_pricing_id: string;
  serviceName: string;
  price: number;
  stage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BasePricingDocument extends BasePricingInterface, Document {}
export interface BasePricingModel extends Model<BasePricingDocument> {}

export const BasePricingSchema: Schema = new Schema(
  {
    base_pricing_id: { type: String, required: true, unique: true },
    serviceName: {type: String},
    price:{type: Number, default: false},
    stage:{type: String, default: false},
  },
  {
    timestamps: true,
  },
);
export const BasePricing: BasePricingModel = model<BasePricingDocument, BasePricingModel>(
  'BasePricing',
  BasePricingSchema,
);


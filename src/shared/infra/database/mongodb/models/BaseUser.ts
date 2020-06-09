import { Document, Schema, Model, model } from 'mongoose';

export interface BaseUserInterface {
  base_user_id: string;
  user_email: string;
  is_email_verified: boolean;
  is_admin_user: boolean;
  is_deleted: boolean;
  username: string;
  user_password: string;
  isAdmin: boolean;
  token: string;
  tokenExpiredTime: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface BaseUserDocument extends BaseUserInterface, Document {}
export interface BaseUserModel extends Model<BaseUserDocument> {}

export const BaseUserSchema: Schema = new Schema(
  {
    base_user_id: { type: String, required: true, unique: true },
    user_email: { type: String, required: true, unique: true },
    is_email_verified: {type: Boolean, default: false},
    is_admin_user:{type: Boolean, default: false},
    is_deleted: {type: Boolean, default: false},
    username: String,
    user_password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    token: { type: String, default: null },
    tokenExpiredTime: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

BaseUserSchema.index({ user_email: 1 }, { unique: true, dropDups: true });

export const BaseUser: BaseUserModel = model<BaseUserDocument, BaseUserModel>(
  'BaseUser',
  BaseUserSchema,
);

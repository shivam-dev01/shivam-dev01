import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface organizationModel {
  adminName?: string;
  mobileNumber?: number;
  organizationName?: string;
  designation?: string;
  organizationType?: string;
  officialMobileNumber?: number;
  businessWebsite?: string;
  businessEmail?: string;
  businessPanCardNumber?: string;
  gstNumber?: string;
  organizationAddress?: string;
  isActive?: boolean;
  isDelete?: boolean;
}
const schema = new Schema<organizationModel>(
  {
    designation: { type: String, required: true },
    organizationType: { type: String, required: true },
    officialMobileNumber: { type: Number, required: true },
    businessWebsite: { type: String, required: false },
    businessPanCardNumber: { type: String, required: false },
    gstNumber: { type: String, required: true },
    organizationAddress: { type: String, required: true },
    businessEmail: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    adminName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    organizationName: { type: String, required: true },
  },
  {
    timestamps: true,
    // toObject: {
    //   transform: function (doc, ret, options) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.isDelete;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
  }
);
export const organizationSchema = model<organizationModel>(
  IDatabaseSchema.ORGANIZATION_DETAILS,
  schema
);

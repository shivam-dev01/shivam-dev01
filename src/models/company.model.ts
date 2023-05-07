import { Model, model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface CompanyModel {
  companyName: string;
  companyId?: string;
  companyAlias: string;
  isActive?: boolean;
  isDelete?: boolean;
}

interface CompanyStatics extends Model<CompanyModel> {
  findByCompanyAlias(companyAlias): CompanyModel;
}

const schema = new Schema<CompanyModel, CompanyStatics>(
  {
    companyId: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAlias: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

schema.statics.findByCompanyAlias = function (id) {
  return this.findOne({ companyAlias: id, isDelete: false });
};

export const CompanySchema = model<CompanyModel, CompanyStatics>(
  IDatabaseSchema.COMPANIES,
  schema
);

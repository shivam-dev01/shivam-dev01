import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ViewModel {
  viewName: string;
  isActive?: boolean;
  isDelete?: boolean;
}

const schema = new Schema<ViewModel>(
  {
    viewName: { type: String, required: true },
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

export const ViewSchema = model<ViewModel>(IDatabaseSchema.VIEWS, schema);

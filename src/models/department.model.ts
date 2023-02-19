import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface departmentModel {
  department?: any;
  departmentId?: Schema.Types.ObjectId;
  isActive?: boolean;
  isDelete?: boolean;
}
const schema = new Schema<departmentModel>(
  {
    department: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.DEPARTMENT,
    },
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
export const departmentSchema = model<departmentModel>(
  IDatabaseSchema.DEPARTMENT,
  schema
);

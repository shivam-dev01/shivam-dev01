import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface jobRoleModel {
  jobRole?: any;
  isActive?: boolean;
  isDelete?: boolean;
  departmentId?: Schema.Types.ObjectId;
}
const schema = new Schema<jobRoleModel>(
  {
    jobRole: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    departmentId: {
      type: Schema.Types.ObjectId,
      required: true,
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
export const jobRoleSchema = model<jobRoleModel>(
  IDatabaseSchema.JOB_ROLE,
  schema
);

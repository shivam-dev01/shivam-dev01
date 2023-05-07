import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export enum LeaveApprovalState {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELED = "CANCELED",
}

export interface LeaveModel {
  userId: Schema.Types.ObjectId;
  fromDate: string;
  toDate: string;
  subject: string;
  description: string;
  noOfDays: string;
  leaveApprovalState: string;
  isDelete?: boolean;
  remark?: string;
}

const schema = new Schema<LeaveModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: false },
    subject: { type: String, required: true },
    description: { type: String, required: false },
    noOfDays: { type: String, required: false },
    leaveApprovalState: {
      type: String,
      required: true,
      enum: LeaveApprovalState,
      default: LeaveApprovalState.PENDING,
    },
    isDelete: { type: Boolean, required: false, default: false },
    remark: { type: String, required: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.isDelete;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const LeaveSchema = model<LeaveModel>(IDatabaseSchema.LEAVE, schema);

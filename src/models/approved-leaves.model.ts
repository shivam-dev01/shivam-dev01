import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export enum LeaveType {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface ApprovedLeaveModel {
  userId?: Schema.Types.ObjectId;
  leaveType?: string;
  date?: string;
  leaveId?: Schema.Types.ObjectId;
  settlementRequest?: boolean;
}

const schema = new Schema<ApprovedLeaveModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    leaveType: {
      type: String,
      required: true,
      enum: LeaveType,
    },
    date: { type: String, required: false },
    leaveId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.LEAVE,
    },
    settlementRequest: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

export const ApprovedLeaveSchema = model<ApprovedLeaveModel>(
  IDatabaseSchema.APPROVED_LEAVES,
  schema
);

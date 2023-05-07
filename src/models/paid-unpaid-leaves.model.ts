import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface paidUnpaidLeaveModel {
  userId: Schema.Types.ObjectId;
  paidLeave: number;
  unpaidLeave: number;
}

const schema = new Schema<paidUnpaidLeaveModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    paidLeave: { type: Number, required: false },
    unpaidLeave: { type: Number, required: false },
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

export const PaidUnpaidLeaveSchema = model<paidUnpaidLeaveModel>(
  IDatabaseSchema.PAID_UNPAID_LEAVES,
  schema
);

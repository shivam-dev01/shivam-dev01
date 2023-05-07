import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { UserType } from "./user.model";

export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum TransactionType {
  ONLINE = "ONLINE",
  CASH = "OFF-LINE",
}

export enum PaymentStatus {
  CREDITED = "CREDITED",
  PENDING = "PENDING",
}

export interface ExpenseModel {
  userId?: Schema.Types.ObjectId;
  userType?: string;
  date?: string;
  amount?: number;
  description?: string;
  status?: string;
  attachment?: string;
  remark?: string;
  approvedDate?: string;
  rejectedDate?: string;
  transactionType?: string;
  paymentStatus?: string;
  bankRRNNumber?: string;
  amountCreditedDate?: string;
  isDelete?: boolean;
}

const schema = new Schema<ExpenseModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    date: { type: String, required: false },
    userType: { type: String, required: false, enum: UserType },
    amount: { type: Number, required: false },
    description: { type: String, required: false },
    status: { type: String, required: true, default: Status.PENDING },
    attachment: { type: String, required: false },
    remark: { type: String, required: false },
    approvedDate: { type: String, required: false },
    rejectedDate: { type: String, required: false },
    transactionType: { type: String, required: false, enum: TransactionType },
    paymentStatus: { type: String, required: false, enum: PaymentStatus },
    bankRRNNumber: { type: String, required: false },
    amountCreditedDate: { type: String, required: false },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const ExpenseSchema = model<ExpenseModel>(
  IDatabaseSchema.EXPENSE,
  schema
);

import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export enum PaymentStatus {
  CREDITED = "CREDITED",
  PENDING = "PENDING",
}

export enum SalarySlipStatus {
  GENERATED = "GENERATED",
  PENDING = "PENDING",
}

export interface monthlyReportModel {
  userId?: Schema.Types.ObjectId;
  monthlyReport?: string;
  month?: string;
  paymentStatus?: string;
  salarySlip?: string;
  salaryCreditedDate?: string;
  bankRRNNumber?: string;
  isDelete?: boolean;
  totalDays?: number;
  workingDays?: number;
  paidLeave?: number;
  unpaidLeave?: number;
  totalWO?: number;
  noOfPresentDays?: number;
  noOfHolidays?: number;
  noOfPaidDays?: number;
  payableSalary?: number;
  noOfAbsentDays?: number;
}
const schema = new Schema<monthlyReportModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    monthlyReport: { type: String, required: true },
    month: { type: String, required: false },
    paymentStatus: {
      type: String,
      required: false,
      default: PaymentStatus.PENDING,
    },
    salarySlip: {
      type: String,
      required: false,
      default: SalarySlipStatus.PENDING,
    },
    salaryCreditedDate: { type: String, required: false },
    bankRRNNumber: { type: String, required: false },
    isDelete: { type: Boolean, required: true, default: false },
    totalDays: { type: Number, required: false },
    workingDays: { type: Number, required: false },
    paidLeave: { type: Number, required: false },
    unpaidLeave: { type: Number, required: false },
    totalWO: { type: Number, required: false },
    noOfPresentDays: { type: Number, required: false },
    noOfHolidays: { type: Number, required: false },
    noOfPaidDays: { type: Number, required: false },
    payableSalary: { type: Number, required: false },
    noOfAbsentDays: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);
export const monthlyReportSchema = model<monthlyReportModel>(
  IDatabaseSchema.MONTHLY_REPORT,
  schema
);

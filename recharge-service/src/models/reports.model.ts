import { model, Schema } from "mongoose";
import { OperatorServiceTypes } from ".";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ReportModel {
  userId?: string;
  rechargeAmount: string;
  transactionNumber: string;
  rechargeNumber: string;
  // circleCode: string;
  serviceType?: OperatorServiceTypes;
  operatorCode: string;
  status?: RechargeStatus;
  errorMessage?: string;
  paymentType?: string;
}
export enum RechargeStatus {
  SUCCESS = "Success",
  FAILURE = "FAILURE",
  PENDING = "Pending",
  Failure = "Failure",
}
export enum PaymentType {
  BILL_PAYMENT = "BILL_PAYMENT",
  RECHARGE = "RECHARGE",
}

const schema = new Schema<ReportModel>(
  {
    userId: { type: String, required: false },
    rechargeAmount: { type: String, required: true },
    transactionNumber: { type: String, required: true },
    rechargeNumber: { type: String, required: true },
    // circleCode: { type: String, required: true },
    operatorCode: {
      type: String,
      required: true,
      ref: IDatabaseSchema.OPERATOR,
    },
    status: { type: String, enum: RechargeStatus, required: false },
    errorMessage: { type: String, required: false },
    serviceType: { type: String, enum: OperatorServiceTypes, required: false },
    paymentType: { type: String, PaymentType, required: true },
  },
  { timestamps: true }
);

export const ReportSchema = model<ReportModel>(IDatabaseSchema.REPORTS, schema);

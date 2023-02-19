import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ReportModel {
  userId: string;
  amount: number;
  serviceType: string;
  paymentState: string;
  paymentType: string;
  transactionNumber: string;
}

const schema = new Schema<ReportModel>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: false },
    serviceType: { type: String, required: false },
    paymentState: { type: String, required: false },
    paymentType: { type: String, required: false },
    transactionNumber: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const ReportSchema = model<ReportModel>(IDatabaseSchema.REPORTS, schema);

import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ReportModel {
  name: string;
  userId: string;
  amount: number;
}

const schema = new Schema<ReportModel>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const ReportSchema = model<ReportModel>(IDatabaseSchema.REPORTS, schema);

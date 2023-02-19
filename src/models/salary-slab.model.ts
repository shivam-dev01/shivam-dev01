import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface salarySlabModel {
  slabName?: string;
  basicSalary?: number;
  pfDeduction?: string;
  esiDeduction?: string;
  houseRentAllowance?: string;
  medicalAllowance?: string;
  travelAllowance?: string;
  foodReimbursement?: string;
  specialAllowance?: string;
  grossCompensation?: string;
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  value5?: number;
  // value6?: number;
  // value7?: number;
  // value8?: number;
  // value9?: number;
  // value10?: number;
  totalCompensation?: number;
  isDelete?: boolean;
}
const schema = new Schema<salarySlabModel>(
  {
    slabName: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    pfDeduction: { type: String, required: false },
    esiDeduction: { type: String, required: false },
    houseRentAllowance: { type: String, required: false },
    medicalAllowance: { type: String, required: false },
    travelAllowance: { type: String, required: false },
    foodReimbursement: { type: String, required: false },
    specialAllowance: { type: String, required: false },
    grossCompensation: { type: String, required: false },
    value1: { type: Number, required: false },
    value2: { type: Number, required: false },
    value3: { type: Number, required: false },
    value4: { type: Number, required: false },
    value5: { type: Number, required: false },
    // value6: { type: Number, required: false },
    // value7: { type: Number, required: false },
    // value8: { type: Number, required: false },
    // value9: { type: Number, required: false },
    // value10: { type: Number, required: false },
    totalCompensation: { type: Number, required: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
export const SalarySlabSchema = model<salarySlabModel>(
  IDatabaseSchema.SALARY_SLAB,
  schema
);

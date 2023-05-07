import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export enum ConfigurationType {
  ATTENDANCE = "ATTENDANCE",
  EMPLOYEE_ID = "EMPLOYEE-ID",
}

export enum ShiftType {
  DAY_SHIFT = "DAY-SHIFT",
  NIGHT_SHIFT = "NIGHT-SHIFT",
}

export enum WeekOffDays {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export interface ConfigurationModel {
  officeInStartTime?: string;
  officeInEndTime?: string;
  officeOutStartTime?: string;
  officeOutEndTime?: string;
  weekOff?: string[];
  shiftType?: string;
  employeeId?: string;
  configurationType: ConfigurationType;
  isDelete?: boolean;
}

const schema = new Schema<ConfigurationModel>(
  {
    officeInStartTime: { type: String, required: false },
    officeInEndTime: { type: String, required: false },
    officeOutStartTime: { type: String, required: false },
    officeOutEndTime: { type: String, required: false },
    weekOff: [{ type: String, required: false, enum: WeekOffDays }],
    shiftType: { type: String, required: false },
    employeeId: { type: String, required: false },
    configurationType: {
      type: String,
      required: false,
      enum: ConfigurationType,
    },
    isDelete: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

export const configurationSchema = model<ConfigurationModel>(
  IDatabaseSchema.CONFIGURATION,
  schema
);

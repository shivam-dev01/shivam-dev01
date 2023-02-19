import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface userInfoModel {
  fullName?: string;
  mobileNumber?: number;
  employeeId?: string;
  loginInTime?: string;
  logoutTime?: string;
  ipAddress?: string;
  location?: string;
  deviceId?: string;
  // activeHours?: string;
  isDelete?: boolean;
}

const schema = new Schema<userInfoModel>(
  {
    fullName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    employeeId: { type: String, required: false, default: null },
    loginInTime: { type: String, required: true },
    logoutTime: { type: String, required: true },
    ipAddress: { type: String, required: true },
    location: { type: String, required: true },
    deviceId: { type: String, required: true },
    // activeHours: { type: String, required: false, default: null },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const loginInfoSchema = model<userInfoModel>(
  IDatabaseSchema.LOGIN_INFO,
  schema
);

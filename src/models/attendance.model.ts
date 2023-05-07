import mongoose, { model, ObjectId, Schema, SchemaType } from "mongoose";
import { Helper } from "../classes/Helper";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export enum AttendanceType {
  IN = "IN",
  OUT = "OUT",
}

export interface AttendanceModel {
  userId: Schema.Types.ObjectId;
  workReport?: string;
  isDelete?: boolean;
  attendanceType: AttendanceType;
  createdAt?: any;
  checkOutTime?: string;
  checkInTime?: string;
  workingHour?: string;
  date?: string;
  remarkBy?: Schema.Types.ObjectId;
  observerRemark?: string;
  todaysWork?: string;
}

const schema = new Schema<AttendanceModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    workReport: { type: String, required: false, default: null },
    isDelete: { type: Boolean, required: true, default: false },
    attendanceType: { type: String, enum: AttendanceType, required: true },
    checkOutTime: { type: String, required: false, default: null },
    checkInTime: { type: String, required: false, default: null },
    workingHour: { type: String, required: false, default: null },
    date: { type: String, required: false },
    remarkBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.USERS,
    },
    observerRemark: { type: String, required: false },
    todaysWork: { type: String, required: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.isDelete;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const AttendanceSchema = model<AttendanceModel>(
  IDatabaseSchema.ATTENDANCE,
  schema
);

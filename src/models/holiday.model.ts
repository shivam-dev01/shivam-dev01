import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface HolidayModel {
  month: string;
  year: string;
  name: string;
  description: string;
  holidayDate: string;
  isDelete?: boolean;
  date: string;
}

const schema = new Schema<HolidayModel>(
  {
    month: { type: String, required: false },
    year: { type: String, required: false },
    name: { type: String, required: false },
    description: { type: String, required: false },
    holidayDate: { type: String, required: false },
    date: { type: String, required: false },
    isDelete: { type: Boolean, required: false, default: false },
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

export const HolidaySchema = model<HolidayModel>(
  IDatabaseSchema.HOLIDAY,
  schema
);

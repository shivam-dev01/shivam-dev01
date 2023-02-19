import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface CircleModel {
  CircleCode: string;
  CircleName: string;
}

const schema = new Schema<CircleModel>({
  CircleCode: { type: String, required: true },
  CircleName: { type: String, required: true },
});

export const CircleSchema = model<CircleModel>(IDatabaseSchema.CIRCLE, schema);

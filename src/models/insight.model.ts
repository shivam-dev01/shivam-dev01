import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface insightModel {
  insightName?: any;
  insightDescription?: any;
  isActive?: boolean;
  isDelete?: boolean;
  insightTypeId?: Schema.Types.ObjectId;
}
const schema = new Schema<insightModel>(
  {
    insightName: { type: String, required: true },
    insightDescription: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    insightTypeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.INSIGHT_TYPE,
    },
  },
  {
    timestamps: true,
    // toObject: {
    //   transform: function (doc, ret, options) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.isDelete;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
  }
);
export const insightSchema = model<insightModel>(
  IDatabaseSchema.INSIGHT,
  schema
);

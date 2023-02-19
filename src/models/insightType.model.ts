import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface insightTypeModel {
  insightType?: any;
  isActive?:boolean;
  isDelete?: boolean;
}
const schema = new Schema<insightTypeModel>(
  {
    insightType: { type: String, required: true },
    isActive:{type:Boolean, required:true, default:false},
    isDelete: { type: Boolean, required: true, default: false },
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
export const insightTypeSchema = model<insightTypeModel>(IDatabaseSchema.INSIGHT_TYPE, schema);

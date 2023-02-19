import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ProjectModel {
  projectName?: string;
  // releaseCount: any;
  projectDescription?: string;
  deadlineDate?: string;
  projectDocuments?: string;
  department?: string;
  isDelete?: boolean;
}

const schema = new Schema<ProjectModel>(
  {
    projectName: { type: String, required: true },
    // releaseCount: { type: Array, required: true },
    projectDescription: { type: String, required: false },
    deadlineDate: { type: String, required: false },
    projectDocuments: { type: String, required: false },
    isDelete: { type: Boolean, required: true, default: false },
    department: { type: String, required: false },
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

export const ProjectSchema = model<ProjectModel>(
  IDatabaseSchema.PROJECT,
  schema
);

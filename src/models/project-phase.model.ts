import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface projectPhaseModel {
  projectId?: Schema.Types.ObjectId;
  phaseName?: string;
  services?: string;
  description?: string;
  deadlineDate?: string;
  team?: any;
  member?: any;
  attachment?: any;
  isActive?: boolean;
  isDelete?: boolean;
}

const schema = new Schema<projectPhaseModel>({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: IDatabaseSchema.PROJECT,
  },
  phaseName: { type: String, required: true },
  services: { type: String, required: false },
  deadlineDate: { type: String, required: false },
  description: { type: String, required: false },
  team: {
    type: Array,
    required: false,
    ref: IDatabaseSchema.TEAM,
  },
  member: {
    type: Array,
    required: false,
    ref: IDatabaseSchema.USERS,
  },
  attachment: { type: Array, required: false },
  isDelete: { type: Boolean, required: false, default: false },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
});

export const PhaseSchema = model<projectPhaseModel>(
  IDatabaseSchema.PROJECT_PHASE,
  schema
);

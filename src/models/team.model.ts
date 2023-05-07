import { Schema, model } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface TeamModel {
  teamName?: string;
  teamLead?: Schema.Types.ObjectId;
  teamDepartment?: string;
  assignedProject?: Schema.Types.ObjectId;
  // anotherLeadMember?: Schema.Types.ObjectId;
  teamMember?: Schema.Types.ObjectId;
  teamDescription: string;
  isActive?: boolean;
  isDelete?: boolean;
}

const schema = new Schema<TeamModel>(
  {
    teamName: { type: String, required: true },
    teamLead: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.USERS,
      default: null,
    },
    teamDepartment: { type: String, required: false },
    assignedProject: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: IDatabaseSchema.PROJECT,
    },
    // anotherLeadMember: {
    //   type: Schema.Types.ObjectId,
    //   required: false,
    //   ref: IDatabaseSchema.USERS,
    // },
    teamMember: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: IDatabaseSchema.USERS,
    },
    teamDescription: {
      type: String,
      required: false,
    },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const TeamSchema = model<TeamModel>(IDatabaseSchema.TEAM, schema);

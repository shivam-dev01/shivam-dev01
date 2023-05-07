import mongoose, { model, Schema } from "mongoose";
import { Helper } from "../classes/Helper";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { ProjectSchema } from "./project.model";
import {
  TaskStatus,
  TaskTransitionModel,
  TaskTransitionSchema,
  TransitionType,
} from "./taskTransition.model";

export interface TaskModel {
  taskName: string;
  taskDescription: string;
  deadlineDate: string;
  taskAssets: string[];
  isDelete?: boolean;
  createdBy: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  taskStatus: TaskStatus;
  assignedTo?: Schema.Types.ObjectId;
  releaseNumber: number;
}

const schema = new Schema<TaskModel>(
  {
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: false },
    deadlineDate: { type: String, required: false },
    taskAssets: [{ type: String, required: false }],
    isDelete: { type: Boolean, required: true, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.USERS,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: IDatabaseSchema.PROJECT,
    },
    taskStatus: { type: String, enum: TaskStatus, required: true },
    assignedTo: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.USERS,
    },
    releaseNumber: {
      type: Number,
      required: true,
      // validate: {
      //   validator: async function (value) {
      //     const projectId = this.projectId;
      //     return new Promise<boolean>(async (resolve, reject) => {
      //       try {
      //         const project = await ProjectSchema.findOne({
      //           // _id: this.projectId,
      //         });
      //         if (project) {
      //           resolve(true);
      //         } else {
      //           reject(new Error("Project not found"));
      //         }
      //       } catch (error) {
      //         reject(new Error("Error while checking project status"));
      //       }
      //     });
      //   },
      //   message: "Email validation failed",
      // },
    },
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

schema
  .path("projectId")
  .validate(async function (value: Schema.Types.ObjectId) {
    return new Promise(async (resolve, reject) => {
      try {
        const project = await ProjectSchema.findOne({ _id: value });
        if (project) {
          resolve(true);
        } else {
          reject(new Error("Project not found"));
        }
      } catch (error) {
        reject(new Error("Error while checking project status"));
      }
    });
  });

// schema.post("save", async function (doc, next) {
//   const transitionData: TaskTransitionModel = {
//     transitionDoneBy: Helper.stringToObjectId(doc.createdBy),
//     taskId: doc.id,
//     transitionType: TransitionType.STATUS_CHANGE,
//     taskStatus: TaskStatus.CREATED,
//   };

//   await TaskTransitionSchema.create(transitionData);

//   next();
// });

export const TaskSchema = model<TaskModel>(IDatabaseSchema.TASK, schema);

import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { TaskSchema } from "./task.model";

export enum TransitionType {
  ASSIGNMENT_CHANGE = "ASSIGNMENT_CHANGE",
  STATUS_CHANGE = "STATUS_CHANGE",
}

export enum TaskStatus {
  CREATED = "CREATED",
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  VERIFIED = "VERIFIED",
}

export const employeeTaskStatusUpdateOrder = {
  [TaskStatus.CREATED]: null as any,
  [TaskStatus.IN_PROGRESS]: TaskStatus.COMPLETED,
  [TaskStatus.COMPLETED]: null as any,
  [TaskStatus.VERIFIED]: null as any,
  [TaskStatus.PLANNED]: TaskStatus.IN_PROGRESS,
};

export const employeeTransitionPossibilities = new Map<
  TaskStatus,
  TaskStatus[]
>()
  .set(TaskStatus.PLANNED, [TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS])
  .set(TaskStatus.IN_PROGRESS, [TaskStatus.COMPLETED]);

export interface TaskTransitionModel {
  assignedTo?: Schema.Types.ObjectId;
  transitionType: TransitionType;
  taskStatus: TaskStatus;
  transitionDoneBy: Schema.Types.ObjectId;
  taskId: Schema.Types.ObjectId;
  isDelete?: boolean;
}

const schema = new Schema<TaskTransitionModel>(
  {
    assignedTo: { type: Schema.Types.ObjectId, required: false },
    taskStatus: { type: String, required: false },
    transitionType: { type: String, required: false },
    transitionDoneBy: { type: Schema.Types.ObjectId, required: false },
    taskId: { type: Schema.Types.ObjectId, required: true },
    isDelete: { type: Boolean, required: true, default: false },
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

schema.path("taskId").validate(async function (value: Schema.Types.ObjectId) {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await TaskSchema.findOne({ _id: value });
      if (project) {
        resolve(true);
      } else {
        reject(new Error("Task not found"));
      }
    } catch (error) {
      reject(new Error("Error while checking task status"));
    }
  });
});

// schema.post("save", function (doc, next) {
//   // this.password = Helper.hashPassword(this.password);
//   console.log(doc);
//   next();
// });

export const TaskTransitionSchema = model<TaskTransitionModel>(
  IDatabaseSchema.TASK_TRANSITION,
  schema
);

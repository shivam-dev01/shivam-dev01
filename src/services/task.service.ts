import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { TaskModel, TaskSchema } from "../models/task.model";
import {
  employeeTaskStatusUpdateOrder,
  employeeTransitionPossibilities,
  TaskStatus,
  TaskTransitionModel,
  TaskTransitionSchema,
  TransitionType,
} from "../models/taskTransition.model";
import { UserType } from "../models/user.model";
import { userServices } from "./user.service";

export class TaskService {
  constructor() {}

  static async createTask(params: TaskModel, taskId: string) {
    try {
      let result = null;
      if (taskId) {
        result = await TaskSchema.findByIdAndUpdate(taskId, params);
      } else {
        result = await TaskSchema.create(params);
      }
      // Helper.sendEmail();
      return result.toObject();
    } catch (error: any) {
      Helper.throwError("Error while creating task.", error);
    }
  }

  static async createTaskTransition(params: TaskTransitionModel) {
    try {
      const result = await TaskTransitionSchema.create(params);
      return result.toObject();
    } catch (error: any) {
      Helper.throwError("Error while creating task.", error);
    }
  }

  static async fetchTasks(
    assignedTo?: string[],
    taskStatus?: TaskStatus[],
    projectIdWithRelease?: object,
    userRole?: UserType,
    deadlineDate?: string
  ) {
    const projectIds = projectIdWithRelease
      ? Helper.stringToObjectIdArray(Object.keys(projectIdWithRelease))
      : [];

    const query: any = [
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: "$taskId",
          doc: { $last: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      {
        $lookup: {
          from: IDatabaseSchema.TASK,
          localField: "taskId",
          foreignField: "_id",
          as: "taskDetails",
        },
      },
      {
        $unwind: "$taskDetails",
      },
      {
        $lookup: {
          from: IDatabaseSchema.PROJECT,
          localField: "taskDetails.projectId",
          foreignField: "_id",
          as: "projectDetails",
        },
      },
      {
        $unwind: "$projectDetails",
      },
    ];

    // // by userId Query
    if (assignedTo && assignedTo.length) {
      query.splice(3, 0, {
        $match: {
          assignedTo: {
            $in: Helper.stringToObjectIdArray(assignedTo),
          },
        },
      });
    }
    // By deadline date query
    if (deadlineDate && deadlineDate.length) {
      query.splice(0, 0, {
        $match: {
          deadlineDate: {
            $in: deadlineDate,
          },
        },
      });
    }

    if (taskStatus && taskStatus.length) {
      query.splice(0, 0, {
        $match: {
          taskStatus: {
            $in: taskStatus,
          },
        },
      });
    }

    if (projectIds && projectIds.length) {
      const projectReleaseQuery = {
        $match: {
          $or: [],
        },
      };

      projectIds.map((each) => {
        projectReleaseQuery["$match"].$or.push({
          $and: [
            {
              "taskDetails.projectId": {
                $in: [each],
              },
            },
          ],
        });

        if (projectIdWithRelease[each].length) {
          projectReleaseQuery["$match"].$or[0].$and.push({
            "taskDetails.releaseNumber": {
              $in: projectIdWithRelease[each],
            },
          });
        }
      });

      query.splice(query.length - 1, 0, projectReleaseQuery);
    }

    Helper.logger(query);

    try {
      let result: any = null;

      result = await TaskTransitionSchema.aggregate(query);

      const userIdSet: Set<string> = new Set();

      if (result && result.length) {
        result.forEach((each) => {
          if (each.assignedTo) {
            userIdSet.add(each.assignedTo.toString());
          }

          // Populate possible transition
          const taskStatus: TaskStatus = each.taskStatus;
          const possibleTaskStatus = [];
          if (userRole === UserType.EMPLOYEE) {
            switch (taskStatus) {
              case TaskStatus.PLANNED:
                possibleTaskStatus.push(
                  { value: TaskStatus.IN_PROGRESS, text: "In progress" },
                  {
                    value: TaskStatus.COMPLETED,
                    text: "Completed",
                  }
                );
                break;

              case TaskStatus.IN_PROGRESS:
                possibleTaskStatus.push({
                  value: TaskStatus.COMPLETED,
                  text: "Completed",
                });
                break;
            }
          } else {
            possibleTaskStatus.push(
              { value: TaskStatus.CREATED, text: "Created" },
              { value: TaskStatus.PLANNED, text: "Planned" },
              { value: TaskStatus.IN_PROGRESS, text: "In progress" },
              {
                value: TaskStatus.COMPLETED,
                text: "Completed",
              },
              { value: TaskStatus.VERIFIED, text: "Verified" }
            );
          }

          each.possibleTransition = possibleTaskStatus;
        });
      }

      const usersIds = Array.from(userIdSet);

      if (usersIds && usersIds.length) {
        const allUserDetails: any = await userServices.fetchUsers(
          null,
          usersIds
        );
        const usersMap = new Map();
        if (allUserDetails) {
          allUserDetails.map((user: any) => {
            usersMap.set(user.id.toString(), user);
          });
        }
        result.forEach((each) => {
          if (each.assignedTo) {
            each.userDetails = usersMap.has(each.assignedTo.toString())
              ? usersMap.get(each.assignedTo.toString())
              : null;
          }
        });
      }

      return result;
    } catch (error: any) {
      Helper.throwError("Error while fetching task", error);
    }
  }

  static async updateTaskStatus(
    taskId: string,
    userId: string,
    userRole: UserType,
    taskStatus: TaskStatus,
    assignedTo: string
  ) {
    try {
      const currentTaskObj = (await this.taskCurrentStatus(
        taskId
      )) as unknown as TaskTransitionModel;

      if (userRole === UserType.EMPLOYEE) {
        if (!currentTaskObj || !currentTaskObj.taskStatus) {
          return Helper.throwError("Error while fetching task");
        }

        const notAllowedError = () => {
          return Helper.throwError(
            "Transaction not allowed or not more further transaction possible."
          );
        };
        const currentTaskStatus: TaskStatus =
          currentTaskObj.taskStatus as TaskStatus;
        if (
          employeeTransitionPossibilities.has(currentTaskStatus) &&
          employeeTaskStatusUpdateOrder[currentTaskStatus]
        ) {
          if (
            employeeTransitionPossibilities
              .get(currentTaskStatus)
              .includes(employeeTaskStatusUpdateOrder[currentTaskStatus])
          ) {
            const newTaskTransitionObj: TaskTransitionModel = {
              ...currentTaskObj,
              taskStatus: taskStatus,
              transitionDoneBy: userId as any,
              transitionType: TransitionType.STATUS_CHANGE,
              taskId: taskId as any,
              assignedTo: currentTaskObj.assignedTo,
            };

            const result = await this.createTaskTransition(
              newTaskTransitionObj
            );
            return result;
          } else {
            notAllowedError();
            return;
          }
        } else {
          notAllowedError();
          return;
        }
      } else {
        const newTaskTransitionObj: TaskTransitionModel = {
          ...currentTaskObj,
          taskStatus:
            assignedTo && taskStatus === TaskStatus.CREATED
              ? TaskStatus.PLANNED
              : taskStatus,
          transitionDoneBy: userId as any,
          transitionType: TransitionType.STATUS_CHANGE,
          taskId: taskId as any,
          assignedTo: assignedTo as any,
        };

        const result = await this.createTaskTransition(newTaskTransitionObj);

        if (result.assignedTo) {
          this.sendUpdateStatus(result.assignedTo, taskId, taskStatus);
        }
        return result;
      }
    } catch (error: any) {
      Helper.throwError("Error while creating task.", error);
    }
  }

  static async taskCurrentStatus(taskId: any) {
    try {
      const task = await TaskTransitionSchema.findOne({ taskId: taskId }).sort({
        createdAt: -1,
      });
      return task;
    } catch (error) {
      Helper.throwError("Error while fetching current task status", error);
    }
  }

  static async getTaskWithAssignedUserByTaskId(taskId: any) {
    try {
      const task = await TaskSchema.findById(taskId).populate("assignedTo");
      return task;
    } catch (error) {
      Helper.throwError("Error while fetching current task status.", error);
    }
  }

  static async sendUpdateStatus(
    userId: any,
    taskId: any,
    taskStatus: TaskStatus
  ) {
    const task = await this.getTaskWithAssignedUserByTaskId(taskId);

    const subject = "Task update status";

    const htmlTemplate = `<h3> NetClack admin has updated the status of task.</h4>
    <br>
    <h4> ${task.taskName} to ${taskStatus} </h4>
    <br>
    Thanks & Regards,
    <br>
    NetClack Admin
    `;

    try {
      const result = await Helper.sendEmail(userId, subject, htmlTemplate);
      console.log("email response", result);
    } catch (error) {
      console.log("Error while sending email - ", error);
    }
  }
}

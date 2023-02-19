import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { TaskModel } from "../models/task.model";
import { TaskStatus } from "../models/taskTransition.model";
import { UserType } from "../models/user.model";
import { TaskService } from "../services/task.service";

export const createTask = async (req: Request, res: Response) => {
  const body: TaskModel = req.body;

  const obj: TaskModel = {
    taskName: body.taskName,
    taskDescription: body.taskDescription,
    deadlineDate: body.deadlineDate,
    taskAssets: body.taskAssets,
    createdBy: res.locals.userData.id,
    projectId: body.projectId,
    taskStatus: TaskStatus.CREATED,
    releaseNumber: body.releaseNumber,
  };

  const taskId = req.params.taskId;

  try {
    const result = await TaskService.createTask(obj, taskId);
    new HttpResponse(
      res,
      taskId ? "Task updated successfully." : "Task created successfully.",
      result
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getTaskListing = async (req: Request, res: Response) => {
  try {
    let { taskStatus, assignedTo, projectIdWithRelease, deadlineDate } =
      req.body as any;

    console.log(projectIdWithRelease);

    if (Helper.getUserRole(res) === UserType.EMPLOYEE) {
      assignedTo = [Helper.getUserId(res)];
    }

    const users = await TaskService.fetchTasks(
      assignedTo,
      taskStatus,
      projectIdWithRelease,
      Helper.getUserRole(res),
      deadlineDate
    );
    new HttpResponse(res, "Task fetched successfully.", users).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const updateTaskTransition = async (req: Request, res: Response) => {
  try {
    const userId = Helper.getUserId(res);
    const taskId = req.params.taskId;
    const userRole = Helper.getUserRole(res);
    const taskStatus = req.body.taskStatus;
    const assignedTo = req.body.assignedTo;

    const users = await TaskService.updateTaskStatus(
      taskId,
      userId,
      userRole,
      taskStatus,
      assignedTo
    );
    new HttpResponse(
      res,
      "Task status updated successfully.",
      users
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

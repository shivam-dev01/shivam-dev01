import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { TaskController } from "../controllers";
import { UserType } from "../models/user.model";

const taskRoute = express.Router();

taskRoute.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.addTask),
  TaskController.createTask
);

taskRoute.put(
  "/:taskId",
  RequestValidation.validateFunction(requestValidationConfig.updateTask),
  TaskController.createTask
);

taskRoute.post(
  "/get-tasks",
  RequestValidation.validateFunction(requestValidationConfig.getTasks),
  TaskController.getTaskListing
);

taskRoute.post(
  "/:taskId/update-task-status",
  RequestValidation.validateFunction(
    requestValidationConfig.updateTaskTransition
  ),
  TaskController.updateTaskTransition
);

export default taskRoute;

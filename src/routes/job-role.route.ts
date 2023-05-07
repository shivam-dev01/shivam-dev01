import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { jobRoleController } from "../controllers";
import { UserType } from "../models/user.model";

const jobRoleRouter = express.Router();

jobRoleRouter.post(
  "/add-job-role",
  RequestValidation.validateFunction(requestValidationConfig.addJobRole),
  jobRoleController.addJobRole
);

jobRoleRouter.put(
  "/update-job-role/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateJobRole),
  jobRoleController.updateJobRole
);

jobRoleRouter.delete(
  "/delete-job-role/:id",
  RequestValidation.validateFunction(requestValidationConfig.deleteJobRole),
  jobRoleController.deleteJobRole
);

jobRoleRouter.get("/get-all-Job-role-details", jobRoleController.getJobRoles);

jobRoleRouter.get(
  "/get-job-role-by-dep-id/:id",
  RequestValidation.validateFunction(requestValidationConfig.getJobRole),
  jobRoleController.getJobRole
);

export default jobRoleRouter;

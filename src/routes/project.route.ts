import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { Helper } from "../classes/Helper";
import { ProjectController } from "../controllers";
import { UserType } from "../models/user.model";
const projectRouter = express.Router();

// projectRouter.get(
//   "/employees-in-project",
//   //Helper.protectedRoute([UserType.ADMIN]),
//   RequestValidation.validateFunction(
//     requestValidationConfig.employeesInProject
//   ),
//   ProjectController.employeesInProject
// );

// projectRouter.get(
//   "/:projectId",
//   //Helper.protectedRoute([UserType.ADMIN]),
//   RequestValidation.validateFunction(requestValidationConfig.getEachProject),
//   ProjectController.getProjectListing
// );

// projectRouter.get(
//   "/",
//   //Helper.protectedRoute([UserType.ADMIN, UserType.EMPLOYEE]),
//   ProjectController.getProjectListing
// );

projectRouter.post(
  "/create-project",
  RequestValidation.validateFunction(requestValidationConfig.addProject),
  ProjectController.createProject
);

projectRouter.put(
  "/update-project/:projectId",
  RequestValidation.validateFunction(requestValidationConfig.updateProject),
  ProjectController.updateProject
);

projectRouter.delete(
  "/delete-project/:id",
  RequestValidation.validateFunction(requestValidationConfig.deleteProject),
  ProjectController.deleteProject
);

projectRouter.get(
  "/project-lists",
  RequestValidation.validateFunction(requestValidationConfig.projectList),
  ProjectController.projectList
);

projectRouter.post(
  "/add-phase",
  RequestValidation.validateFunction(requestValidationConfig.addPhase),
  ProjectController.addPhase
);

projectRouter.put(
  "/update-phase/:id",
  RequestValidation.validateFunction(requestValidationConfig.updatePhase),
  ProjectController.updatePhase
);

projectRouter.get(
  "/get-phase-list",
  RequestValidation.validateFunction(requestValidationConfig.getPhase),
  ProjectController.getPhase
);

projectRouter.delete(
  "/delete-phase/:id",
  RequestValidation.validateFunction(requestValidationConfig.deletePhase),
  ProjectController.deletePhase
);

export default projectRouter;

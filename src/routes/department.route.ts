import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { departmentController } from "../controllers";
import { UserType } from "../models/user.model";

const departmentRouter = express.Router();

departmentRouter.post(
  "/add-department",
  // //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.addDepartment),
  departmentController.addDepartment
);

// departmentRouter.put(
//   "/update-department/:id",
//   RequestValidation.validateFunction(requestValidationConfig.updateDepartment),
//   departmentController.updateDepartment
// );

// departmentRouter.delete(
//   "/delete-department/:id",
//   RequestValidation.validateFunction(requestValidationConfig.deleteDepartment),
//   departmentController.deleteDepartment
// );

departmentRouter.get(
  "/get-all-department-details",
  // //Helper.protectedRoute([UserType.ADMIN]),
  departmentController.getDepartmentDetails
);

departmentRouter.post(
  "/admin-save-department",
  // //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(
    requestValidationConfig.adminSaveDepartment
  ),
  departmentController.adminSaveDepartment
);

departmentRouter.put(
  "/admin-update-department/:id",
  // //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(
    requestValidationConfig.adminUpdateDepartment
  ),
  departmentController.adminUpdateDepartment
);

export default departmentRouter;

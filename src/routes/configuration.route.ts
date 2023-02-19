import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { configurationController } from "../controllers";
import { UserType } from "../models/user.model";

const configurationRouter = express();

configurationRouter.post(
  "/configure-employeeId",
  RequestValidation.validateFunction(
    requestValidationConfig.configureEmployeeId
  ),
  configurationController.configureEmployeeId
);

// configurationRouter.put(
//   "/configure-update-employeeId/:id",
//   RequestValidation.validateFunction(
//     requestValidationConfig.configureUpdateEmployeeId
//   ),
//   configurationController.configureUpdateEmployeeId
// );

configurationRouter.get(
  "/configure-get-employeeId",
  configurationController.configureGetEmployeeId
);

configurationRouter.post(
  "/configure-attendance-timing",
  RequestValidation.validateFunction(
    requestValidationConfig.configureAttendanceTiming
  ),
  configurationController.configureAttendanceTime
);

configurationRouter.get(
  "/configure-get-attendance-timing",
  configurationController.configureGetAttendanceTime
);

configurationRouter.put(
  "/configure-update-attendance-timing/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.configureUpdateAttendanceTiming
  ),
  configurationController.configureUpdateAttendanceTime
);

export default configurationRouter;

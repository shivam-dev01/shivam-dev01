import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { leaveController } from "../controllers";
const leaveRouter = express.Router();

leaveRouter.post(
  "/apply-leave",
  RequestValidation.validateFunction(requestValidationConfig.applyLeave),
  leaveController.applyLeave
);

leaveRouter.get(
  "/get-leave-request-list",
  RequestValidation.validateFunction(
    requestValidationConfig.getLeaveRequestList
  ),
  leaveController.leaveRequestList
);

leaveRouter.get(
  "/admin-leave-request-list",
  RequestValidation.validateFunction(
    requestValidationConfig.adminLeaveRequestList
  ),
  leaveController.adminLeaveRequestList
);

leaveRouter.get(
  "/admin-get-separate-leave-request-list/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.adminGetSeparateLeaveRequestList
  ),
  leaveController.adminGetSeparateLeaveRequestList
);

leaveRouter.put(
  "/update-leave-status/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateLeave),
  leaveController.updateLeave
);
leaveRouter.get(
  "/leave-search",
  RequestValidation.validateFunction(requestValidationConfig.leaveSearch),
  leaveController.leaveSearch
);

leaveRouter.get(
  "/employee-leave-search",
  RequestValidation.validateFunction(
    requestValidationConfig.employeeLeaveSearch
  ),
  leaveController.employeeLeaveSearch
);

leaveRouter.get(
  "/filter-leave-request",
  RequestValidation.validateFunction(
    requestValidationConfig.filterLeaveRequests
  ),
  leaveController.filterLeaveRequests
);

export default leaveRouter;

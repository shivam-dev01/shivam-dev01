import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { userController } from "../controllers";
import { UserType } from "../models/user.model";

//-------------------employeeDetails-------------------

const userRouter = express.Router();
userRouter.post(
  "/create-employeeDetail",
  RequestValidation.validateFunction(
    requestValidationConfig.createEmployeeDetails
  ),
  userController.createEmployeeDetails
);

userRouter.put(
  "/update-employee/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.updateEmployeeDetails
  ),
  userController.updateEmployeeDetails
);

userRouter.post(
  "/get-login-info",
  RequestValidation.validateFunction(requestValidationConfig.loginInfo),
  userController.loginInfo
);

userRouter.get(
  "/get-last-login-time/:mobileNumber",
  RequestValidation.validateFunction(requestValidationConfig.getLastLoginTime),
  userController.getLastLoginTime
);

userRouter.put(
  "/user-status/:id/:mobileNumber",
  RequestValidation.validateFunction(requestValidationConfig.userStatus),
  userController.userStatus
);

userRouter.get("/generate-employeeId", userController.generateEmployeeId);

userRouter.get(
  "/get-all-employeeDetails",
  userController.getAllEmployeeDetails
);

userRouter.get(
  "/get-specified-employeeDetails/:userId",
  RequestValidation.validateFunction(
    requestValidationConfig.getOneEmployeeDetails
  ),
  userController.getspecifiedEmployeeDetails
);

userRouter.put(
  "/employee-status/:id",
  RequestValidation.validateFunction(requestValidationConfig.employeeStatus),
  userController.employeeStatus
);

userRouter.get(
  "/last-generated-employee-id",
  userController.lastGeneratedEmpId
);

userRouter.get(
  "/get-admin-profile-details",
  userController.getAdminProfileDetails
);

userRouter.put(
  "/update-admin-profile/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.updateAdminProfile
  ),
  userController.updateAdminProfile
);

userRouter.post(
  "/attendance",
  RequestValidation.validateFunction(requestValidationConfig.markAttendance),
  userController.markAttendance
);

userRouter.get(
  "/single-users-attendance-report",
  RequestValidation.validateFunction(
    requestValidationConfig.getAttendanceReport
  ),
  userController.getAttendanceReport
);

userRouter.get(
  "/get-attendance-report/:id",
  RequestValidation.validateFunction(requestValidationConfig.getSingleReport),
  userController.getSingleReport
);

userRouter.get(
  "/get-custom-attendance-report",
  RequestValidation.validateFunction(requestValidationConfig.getCustomReport),
  userController.getCustomReport
);

userRouter.get(
  "/get-custom-employee-list",
  RequestValidation.validateFunction(
    requestValidationConfig.getCustomEmployeeList
  ),
  userController.getCustomEmployeeList
);

userRouter.put(
  "/assign-shift/:id",
  RequestValidation.validateFunction(requestValidationConfig.assignShift),
  userController.assignShift
);

userRouter.get(
  "/filter-employee-list",
  RequestValidation.validateFunction(requestValidationConfig.filteredEmployee),
  userController.filteredEmployee
);

userRouter.get(
  "/employee-attendance-report",
  RequestValidation.validateFunction(
    requestValidationConfig.employeeAttendanceReport
  ),
  userController.employeeAttendanceReport
);

userRouter.get(
  "/attendance-report",
  RequestValidation.validateFunction(requestValidationConfig.attendanceReport),
  userController.attendanceReport
);

userRouter.get(
  "/search-employee",
  RequestValidation.validateFunction(requestValidationConfig.searchEmployee),
  userController.searchEmployee
);

userRouter.get(
  "/search-attendance",
  RequestValidation.validateFunction(requestValidationConfig.searchAttendance),
  userController.searchAttendance
);

userRouter.get(
  "/employee-search-attendance",
  RequestValidation.validateFunction(
    requestValidationConfig.employeeSearchAttendance
  ),
  userController.employeeSearchAttendance
);

userRouter.put(
  "/employee-upload-profile-image/:id",
  RequestValidation.validateFunction(requestValidationConfig.uploadImage),
  userController.uploadImage
);

userRouter.put(
  "/admin-upload-profile-image/:id",
  RequestValidation.validateFunction(requestValidationConfig.uploadImage),
  userController.adminUploadImage
);

userRouter.get(
  "/monthly-yearly-single-user-attendance-report",
  RequestValidation.validateFunction(
    requestValidationConfig.monthlyYearlyAttendanceReport
  ),
  userController.monthlyYearlyAttendanceReport
);

userRouter.get(
  "/monthly-yearly-complete-report",
  RequestValidation.validateFunction(
    requestValidationConfig.monthlyYearlyCompleteReport
  ),
  userController.monthlyYearlyCompleteReport
);

userRouter.put(
  "/observer-remark-on-daily-work-report/:id",
  RequestValidation.validateFunction(requestValidationConfig.observerRemark),
  userController.observerRemark
);

userRouter.put(
  "/remove-observer-remark-on-daily-work-report/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.removeObserverRemark
  ),
  userController.removeObserverRemark
);

userRouter.post(
  "/generate-monthly-report",
  RequestValidation.validateFunction(
    requestValidationConfig.generateMonthlyReport
  ),
  userController.generateMonthlyReport
);

userRouter.put(
  "/update-payment-status/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.updatePaymentStatus
  ),
  userController.updatePaymentStatus
);

userRouter.put(
  "/generate-salary-slip/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.generateSalarySlip
  ),
  userController.generateSalarySlip
);

userRouter.get(
  "/filter-employee",
  RequestValidation.validateFunction(requestValidationConfig.filterEmployee),
  userController.filterEmployee
);

userRouter.get(
  "/fetch-monthly-report",
  RequestValidation.validateFunction(
    requestValidationConfig.fetchMonthlyReport
  ),
  userController.fetchMonthlyReport
);

export default userRouter;

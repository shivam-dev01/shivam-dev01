"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var configurationRouter = (0, express_1.default)();
configurationRouter.post("/configure-employeeId", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.configureEmployeeId), controllers_1.configurationController.configureEmployeeId);
// configurationRouter.put(
//   "/configure-update-employeeId/:id",
//   RequestValidation.validateFunction(
//     requestValidationConfig.configureUpdateEmployeeId
//   ),
//   configurationController.configureUpdateEmployeeId
// );
configurationRouter.get("/configure-get-employeeId", controllers_1.configurationController.configureGetEmployeeId);
configurationRouter.post("/configure-attendance-timing", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.configureAttendanceTiming), controllers_1.configurationController.configureAttendanceTime);
configurationRouter.get("/configure-get-attendance-timing", controllers_1.configurationController.configureGetAttendanceTime);
configurationRouter.put("/configure-update-attendance-timing/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.configureUpdateAttendanceTiming), controllers_1.configurationController.configureUpdateAttendanceTime);
exports.default = configurationRouter;

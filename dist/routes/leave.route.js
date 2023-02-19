"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var leaveRouter = express_1.default.Router();
leaveRouter.post("/apply-leave", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.applyLeave), controllers_1.leaveController.applyLeave);
leaveRouter.get("/get-leave-request-list", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getLeaveRequestList), controllers_1.leaveController.leaveRequestList);
leaveRouter.get("/admin-leave-request-list", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.adminLeaveRequestList), controllers_1.leaveController.adminLeaveRequestList);
leaveRouter.get("/admin-get-separate-leave-request-list/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.adminGetSeparateLeaveRequestList), controllers_1.leaveController.adminGetSeparateLeaveRequestList);
leaveRouter.put("/update-leave-status/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateLeave), controllers_1.leaveController.updateLeave);
leaveRouter.get("/leave-search", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.leaveSearch), controllers_1.leaveController.leaveSearch);
leaveRouter.get("/employee-leave-search", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employeeLeaveSearch), controllers_1.leaveController.employeeLeaveSearch);
exports.default = leaveRouter;

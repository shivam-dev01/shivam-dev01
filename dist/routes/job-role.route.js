"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var jobRoleRouter = express_1.default.Router();
jobRoleRouter.post("/add-job-role", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.addJobRole), controllers_1.jobRoleController.addJobRole);
jobRoleRouter.put("/update-job-role/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateJobRole), controllers_1.jobRoleController.updateJobRole);
jobRoleRouter.delete("/delete-job-role/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.deleteJobRole), controllers_1.jobRoleController.deleteJobRole);
jobRoleRouter.get("/get-all-Job-role-details", controllers_1.jobRoleController.getJobRoles);
jobRoleRouter.get("/get-job-role-by-dep-id/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getJobRole), controllers_1.jobRoleController.getJobRole);
exports.default = jobRoleRouter;

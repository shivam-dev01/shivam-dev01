"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var taskRoute = express_1.default.Router();
taskRoute.post("/", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.addTask), controllers_1.TaskController.createTask);
taskRoute.put("/:taskId", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateTask), controllers_1.TaskController.createTask);
taskRoute.post("/get-tasks", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getTasks), controllers_1.TaskController.getTaskListing);
taskRoute.post("/:taskId/update-task-status", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateTaskTransition), controllers_1.TaskController.updateTaskTransition);
exports.default = taskRoute;

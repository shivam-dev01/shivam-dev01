"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var projectRouter = express_1.default.Router();
projectRouter.get("/employees-in-project", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employeesInProject), controllers_1.ProjectController.employeesInProject);
projectRouter.get("/:projectId", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getEachProject), controllers_1.ProjectController.getProjectListing);
projectRouter.get("/", 
//Helper.protectedRoute([UserType.ADMIN, UserType.EMPLOYEE]),
controllers_1.ProjectController.getProjectListing);
projectRouter.post("/", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.addProject), controllers_1.ProjectController.createProject);
projectRouter.put("/:projectId", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateProject), controllers_1.ProjectController.createProject);
projectRouter.delete("/:projectId", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getEachProject), controllers_1.ProjectController.createProject);
exports.default = projectRouter;

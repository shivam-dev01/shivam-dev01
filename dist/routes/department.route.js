"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var departmentRouter = express_1.default.Router();
departmentRouter.post("/add-department", 
// //Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.addDepartment), controllers_1.departmentController.addDepartment);
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
departmentRouter.get("/get-all-department-details", 
// //Helper.protectedRoute([UserType.ADMIN]),
controllers_1.departmentController.getDepartmentDetails);
departmentRouter.post("/admin-save-department", 
// //Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.adminSaveDepartment), controllers_1.departmentController.adminSaveDepartment);
departmentRouter.put("/admin-update-department/:id", 
// //Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.adminUpdateDepartment), controllers_1.departmentController.adminUpdateDepartment);
exports.default = departmentRouter;

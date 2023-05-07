"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var empPersonalDetailsRouter = express_1.default.Router();
empPersonalDetailsRouter.post("/employee-personal-details", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.empPersonalDetails), controllers_1.empPersonalDetailsControllers.empPersonalDetails);
empPersonalDetailsRouter.put("/employee-update-personal-details/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.empUpdatePersonalDetails), controllers_1.empPersonalDetailsControllers.empUpdatePersonalDetails);
empPersonalDetailsRouter.get("/employee-get-personal-details", controllers_1.empPersonalDetailsControllers.empGetPersonalDetails);
empPersonalDetailsRouter.get("/employee-get-specified-personal-details/:mobileNumber", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.empGetSpecifiedPersonalDetails), controllers_1.empPersonalDetailsControllers.empGetSpecifiedPersonalDetails);
exports.default = empPersonalDetailsRouter;

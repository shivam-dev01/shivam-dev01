"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestValidation_1 = require("../classes/RequestValidation");
var express_1 = __importDefault(require("express"));
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var companyRouter = express_1.default.Router();
companyRouter.post("/", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.createCompany), controllers_1.CompanyController.createCompany);
companyRouter.get("/", controllers_1.CompanyController.getCompany);
companyRouter.delete("/:companyId", controllers_1.CompanyController.deleteCompany);
companyRouter.put("/:companyId", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateCompany), controllers_1.CompanyController.updateCompany);
exports.default = companyRouter;

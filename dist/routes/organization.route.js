"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var organizationRouter = express_1.default.Router();
organizationRouter.post("/organization-details", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.organizationDetails), controllers_1.OrganizationController.organizationDetails);
organizationRouter.get("/get-organization-details", controllers_1.OrganizationController.getOrganizationDetails);
exports.default = organizationRouter;

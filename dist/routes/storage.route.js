"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var storageRouter = express_1.default.Router();
storageRouter.get("/", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.signedUrl), controllers_1.StorageController.getSignedUrl);
exports.default = storageRouter;

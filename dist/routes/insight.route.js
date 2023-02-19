"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var insightRouter = express_1.default.Router();
insightRouter.post("/create-insight", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.createInsight), controllers_1.insightController.createInsight);
insightRouter.put("/update-insight/:id", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateInsight), controllers_1.insightController.updateInsight);
insightRouter.delete("/delete-insight/:id", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.deleteInsight), controllers_1.insightController.deleteInsight);
insightRouter.get("/get-insight-details", 
//Helper.protectedRoute([UserType.ADMIN]),
controllers_1.insightController.getInsight);
exports.default = insightRouter;

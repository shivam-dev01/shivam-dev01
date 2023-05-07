"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var insightTypeRouter = express_1.default.Router();
insightTypeRouter.post("/create-insight-type", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.createInsightType), controllers_1.insightTypeController.createInsightType);
insightTypeRouter.put("/update-insight-type/:id", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateInsightType), controllers_1.insightTypeController.updateInsightType);
insightTypeRouter.delete("/delete-insight-type/:id", 
//Helper.protectedRoute([UserType.ADMIN]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.deleteInsightType), controllers_1.insightTypeController.deleteInsightType);
insightTypeRouter.get("/get-insight-type-details", 
//Helper.protectedRoute([UserType.ADMIN]),
controllers_1.insightTypeController.getInsightTypeDetails);
exports.default = insightTypeRouter;

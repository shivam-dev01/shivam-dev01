"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestValidation_1 = require("../classes/RequestValidation");
var express_1 = __importDefault(require("express"));
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var viewRouter = express_1.default.Router();
viewRouter.post("/", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.createView), controllers_1.ViewController.createViews);
viewRouter.get("/", controllers_1.ViewController.getViews);
viewRouter.delete("/:viewId", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.deleteView), controllers_1.ViewController.deleteViews);
viewRouter.put("/:viewId", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateView), controllers_1.ViewController.updateViews);
exports.default = viewRouter;

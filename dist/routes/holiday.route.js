"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var holidayRouter = express_1.default.Router();
holidayRouter.post("/add-holiday", 
// RequestValidation.validateFunction(requestValidationConfig.addHoliday),//need another validation after after taking request payload in array this validation is not working
controllers_1.holidayController.addHoliday);
holidayRouter.get("/get-holiday-list", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.getHolidayList), controllers_1.holidayController.getHolidayList);
holidayRouter.delete("/remove-holiday/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.removeHoliday), controllers_1.holidayController.removeHoliday);
holidayRouter.put("/update-holiday/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateHoliday), controllers_1.holidayController.updateHoliday);
exports.default = holidayRouter;

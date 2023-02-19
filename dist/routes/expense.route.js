"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RequestValidation_1 = require("../classes/RequestValidation");
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var expenseRouter = express_1.default.Router();
expenseRouter.post("/add-expense", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.addExpenses), controllers_1.expenseController.addExpenses);
expenseRouter.put("/update-expense/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.updateExpenses), controllers_1.expenseController.updateExpenses);
expenseRouter.delete("/delete-expense/:id", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.deleteExpenses), controllers_1.expenseController.deleteExpenses);
exports.default = expenseRouter;

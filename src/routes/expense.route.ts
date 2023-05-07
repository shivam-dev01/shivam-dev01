import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { expenseController } from "../controllers";

const expenseRouter = express.Router();

expenseRouter.post(
  "/add-expense",
  RequestValidation.validateFunction(requestValidationConfig.addExpenses),
  expenseController.addExpenses
);

expenseRouter.put(
  "/update-expense/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateExpenses),
  expenseController.updateExpenses
);

expenseRouter.delete(
  "/delete-expense/:id",
  RequestValidation.validateFunction(requestValidationConfig.deleteExpenses),
  expenseController.deleteExpenses
);

expenseRouter.get(
  "/expense-lists",
  RequestValidation.validateFunction(requestValidationConfig.expensesLists),
  expenseController.expensesLists
);

expenseRouter.put(
  "/update-expense-status/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.updateExpenseStatus
  ),
  expenseController.updateExpenseStatus
);

expenseRouter.put(
  "/update-expense-payment-status/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.expensePaymentStatus
  ),
  expenseController.expensePaymentStatus
);

expenseRouter.get(
  "/filter",
  RequestValidation.validateFunction(requestValidationConfig.filterExpense),
  expenseController.filterExpense
);

expenseRouter.get(
  "/single-expense/:id",
  RequestValidation.validateFunction(requestValidationConfig.singleExpense),
  expenseController.singleExpense
);

export default expenseRouter;

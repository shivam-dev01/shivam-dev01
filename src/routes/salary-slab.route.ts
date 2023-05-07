import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { salarySlabController } from "../controllers";

const salarySlabRouter = express.Router();

salarySlabRouter.post(
  "/add-salary-slab",
  RequestValidation.validateFunction(requestValidationConfig.addSalarySlab),
  salarySlabController.addSalarySlab
);

salarySlabRouter.put(
  "/update-salary-slab/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateSalarySlab),
  salarySlabController.updateSalarySlab
);

salarySlabRouter.delete(
  "/delete-salary-slab/:id",
  RequestValidation.validateFunction(requestValidationConfig.deleteSalarySlab),
  salarySlabController.deleteSalarySlab
);

salarySlabRouter.get(
  "/fetch-salary-slab-lists",
  RequestValidation.validateFunction(requestValidationConfig.fetchSalarySlab),
  salarySlabController.fetchSalarySlabLists
);

salarySlabRouter.get(
  "/employee-details-with-salary",
  // RequestValidation.validateFunction(requestValidationConfig.deleteSalarySlab),
  salarySlabController.fetchEmployeeSalaryDetails
);

salarySlabRouter.get(
  "/filter-monthly-report",
  RequestValidation.validateFunction(
    requestValidationConfig.filterMonthlyReport
  ),
  salarySlabController.filterMonthlyReport
);

export default salarySlabRouter;

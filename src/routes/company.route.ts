import { RequestValidation } from "../classes/RequestValidation";
import express from "express";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { CompanyController } from "../controllers";
const companyRouter = express.Router();

companyRouter.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.createCompany),
  CompanyController.createCompany
);

companyRouter.get("/", CompanyController.getCompany);

companyRouter.delete("/:companyId", CompanyController.deleteCompany);

companyRouter.put(
  "/:companyId",
  RequestValidation.validateFunction(requestValidationConfig.updateCompany),
  CompanyController.updateCompany
);

export default companyRouter;

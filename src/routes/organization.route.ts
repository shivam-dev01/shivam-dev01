import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { OrganizationController } from "../controllers";

const organizationRouter = express.Router();

organizationRouter.post(
  "/organization-details",
  RequestValidation.validateFunction(
    requestValidationConfig.organizationDetails
  ),
  OrganizationController.organizationDetails
);

organizationRouter.get(
  "/get-organization-details",
  OrganizationController.getOrganizationDetails
);

export default organizationRouter;

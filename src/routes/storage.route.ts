import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { StorageController } from "../controllers";
import { UserType } from "../models/user.model";

const storageRouter = express.Router();

storageRouter.get(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.signedUrl),
  StorageController.getSignedUrl
);
export default storageRouter;

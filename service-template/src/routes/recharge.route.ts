import { RechargeController } from "../controllers";
import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { body } from "express-validator";
import { requestValidationConfig } from "../config/requestValidationConfig";
const rechargeRouter = express.Router();

rechargeRouter.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.report),
  RechargeController.recharge
);
rechargeRouter.get("/", RechargeController.recharge);

export default rechargeRouter;

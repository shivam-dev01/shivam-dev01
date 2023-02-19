import { RechargeController } from "../controllers";
import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { RechargeService } from "../services/recharge.service";
const rechargeRouter = express.Router();

rechargeRouter.get("/test-services", RechargeController.recharge);

rechargeRouter.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.report),
  RechargeController.recharge
);
rechargeRouter.get("/", RechargeController.recharge);

rechargeRouter.get("/fetch-circle", RechargeController.getCircle);

rechargeRouter.get(
  "/fetch-operator",
  RequestValidation.validateFunction(requestValidationConfig.fetchOperators),
  RechargeController.getOperator
);

rechargeRouter.post(
  "/do-recharge",
  RequestValidation.validateFunction(requestValidationConfig.doRecharge),
  RechargeController.doRecharge
);

rechargeRouter.post(
  "/check-recharge-status",
  RequestValidation.validateFunction(requestValidationConfig.rechargeStatus),
  RechargeController.getRechargeStatus
);

rechargeRouter.get(
  "/get-all-reports",
  RequestValidation.validateFunction(requestValidationConfig.report),
  RechargeController.getReports
);

rechargeRouter.post(
  "/bill-fetch-fields",
  RequestValidation.validateFunction(requestValidationConfig.billFetchFields),
  RechargeController.billFetchFields
);

rechargeRouter.post(
  "/bill-fetch",
  RequestValidation.validateFunction(requestValidationConfig.billFetch),
  RechargeController.billFetch
);

rechargeRouter.post(
  "/plan-fetch",
  RequestValidation.validateFunction(requestValidationConfig.planFetch),
  RechargeController.planFetch
);

rechargeRouter.post(
  "/bill-payment",
  RequestValidation.validateFunction(requestValidationConfig.billPayment),
  RechargeController.billPayment
);

export default rechargeRouter;

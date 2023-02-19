import { WalletController } from "../controllers";
import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { body } from "express-validator";
import { requestValidationConfig } from "../config/requestValidationConfig";
const walletRouter = express.Router();

walletRouter.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.report),
  WalletController.recharge
);
walletRouter.get("/", WalletController.recharge);

walletRouter.post(
  "/create-wallet",
  RequestValidation.validateFunction(requestValidationConfig.walletReport),
  WalletController.createWallet
);

walletRouter.post(
  "/get-wallet",
  RequestValidation.validateFunction(requestValidationConfig.getWallet),
  WalletController.getWallet
);

walletRouter.post(
  "/payment",
  RequestValidation.validateFunction(requestValidationConfig.payment),
  WalletController.payment
);

walletRouter.post(
  '/generate-payment-id',
  RequestValidation.validateFunction(requestValidationConfig.generatePaymentId),
  WalletController.generatePaymentId
);

walletRouter.get("/reports", WalletController.reports);

walletRouter.put(
  "/update-wallet-balance",
  RequestValidation.validateFunction(
    requestValidationConfig.updateWalletBalance
  ),
  WalletController.updateWalletBalance
);

walletRouter.post(
  "/check-transaction-status",
  RequestValidation.validateFunction(
    requestValidationConfig.checkTransactionStatus
  ),
  WalletController.checkTransactionStatus
);

walletRouter.post(
  "/collect-pay-request",
  RequestValidation.validateFunction(requestValidationConfig.collectPayRequest),
  WalletController.collectPayRequest
);

export default walletRouter;

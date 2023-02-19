import { RequestValidation } from "../classes/RequestValidation";
import express from "express";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { AuthController } from "../controllers";
const authRouter = express.Router();

authRouter.get("/ping-server", AuthController.testDb);

authRouter.post(
  "/login",
  RequestValidation.validateFunction(requestValidationConfig.login),
  AuthController.login
);

authRouter.post(
  "/employer-register",
  RequestValidation.validateFunction(requestValidationConfig.employerRegister),
  AuthController.employerRegister
);

authRouter.post(
  "/send-otp",
  RequestValidation.validateFunction(requestValidationConfig.sendOtp),
  AuthController.sendOtp
);

authRouter.post(
  "/verify-otp",
  RequestValidation.validateFunction(requestValidationConfig.verifyOtp),
  AuthController.verifyOtp
);

authRouter.post(
  "/reset-password",
  RequestValidation.validateFunction(requestValidationConfig.resetPassword),
  AuthController.resetPassword
);

authRouter.put(
  "/change-password/:id",
  // //Helper.protectedRoute([UserType.ADMIN, UserType.EMPLOYEE]),
  RequestValidation.validateFunction(requestValidationConfig.changePassword),
  AuthController.changePassword
);

// authRouter.post(
//   "/get-login-info",
//   // //Helper.protectedRoute([UserType.ADMIN]),
//   RequestValidation.validateFunction(requestValidationConfig.loginInfo),
//   AuthController.loginInfo
// );

export default authRouter;

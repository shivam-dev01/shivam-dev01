"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestValidation_1 = require("../classes/RequestValidation");
var express_1 = __importDefault(require("express"));
var requestValidationConfig_1 = require("../config/requestValidationConfig");
var controllers_1 = require("../controllers");
var authRouter = express_1.default.Router();
authRouter.get("/ping-server", controllers_1.AuthController.testDb);
authRouter.post("/login", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.login), controllers_1.AuthController.login);
authRouter.post("/employer-register", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.employerRegister), controllers_1.AuthController.employerRegister);
authRouter.post("/send-otp", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.sendOtp), controllers_1.AuthController.sendOtp);
authRouter.post("/verify-otp", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.verifyOtp), controllers_1.AuthController.verifyOtp);
authRouter.post("/reset-password", RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.resetPassword), controllers_1.AuthController.resetPassword);
authRouter.put("/change-password/:id", 
// //Helper.protectedRoute([UserType.ADMIN, UserType.EMPLOYEE]),
RequestValidation_1.RequestValidation.validateFunction(requestValidationConfig_1.requestValidationConfig.changePassword), controllers_1.AuthController.changePassword);
// authRouter.post(
//   "/get-login-info",
//   // //Helper.protectedRoute([UserType.ADMIN]),
//   RequestValidation.validateFunction(requestValidationConfig.loginInfo),
//   AuthController.loginInfo
// );
exports.default = authRouter;

import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { AuthService } from "../services/auth.service";
import { Helper } from "../classes/Helper";

export const login = async (req: Request, res: Response) => {
  console.log("Login controller:--", req.body);
  const loginParam = {
    mobileNumber: req.body.mobileNumber,
    password: req.body.password,
    companyAlias: req.body.companyAlias,
  };
  try {
    const result = await AuthService.login(loginParam);
    new HttpResponse(
      res,
      Messages.WELCOME_TO_NETCLACK_MESSAGE,
      result
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const testDb = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      fullName: "deepak",
      password: "1234",
      mobileNumber: 1234567,
      ipAddress: "11111",
      parent: "some parent",
      parentType: "body.parentType",
      location: "body.location",
      organizationName: "body.organizationName",
      userType: "body.userType",
      departmentName: "body.departmentName",
    };

    AuthService.employerRegister(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "You are registered successfully" : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const employerRegister = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      fullName: body.fullName,
      password: body.password,
      mobileNumber: body.mobileNumber,
      ipAddress: body.ipAddress,
      parent: body.parent,
      parentType: body.parentType,
      location: body.location,
      organizationName: body.organizationName,
      userType: body.userType,
      departmentName: body.departmentName,
      isRootUser: body.isRootUser ? body.isRootUser : false,
    };
    AuthService.employerRegister(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "You are registered successfully" : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    mobileNumber: body.mobileNumber,
  };
  try {
    AuthService.sendOtp(data, (result: any) => {
      new HttpResponse(
        res,
        result
          ? Messages.OTP_SENT_SUCCESS_MESSAGE
          : Messages.OTP_SEND_FAILED_MESSAGE,
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    sessionId: body.sessionId,
    otpValue: body.otpValue,
  };

  try {
    AuthService.verifyOtp(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "OTP verified successfully." : "OTP not matched.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    mobileNumber: body.mobileNumber,
    password: body.password,
    otpValue: body.otpValue,
    sessionId: body.sessionId,
  };

  try {
    AuthService.resetPassword(data, (result: any) => {
      new HttpResponse(
        res,
        result === "oldPass"
          ? "Old password and new password can't be same."
          : result === "true"
          ? "Password changed successfully."
          : result === "false"
          ? "Failed."
          : null,
        result,
        result === "oldPass"
          ? HttpStatuses.BAD_REQUEST
          : result === "true"
          ? HttpStatuses.OK
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    newPassword: body.newPassword,
    oldPassword: body.oldPassword,
  };
  try {
    await AuthService.changePassword(data, req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result === "oldPass"
          ? "Old password and new password can't be same"
          : result === "true"
          ? "Your password has been changed successfully"
          : result === "false"
          ? "Your old password is incorrect"
          : null,
        result,
        result === "oldPass"
          ? HttpStatuses.BAD_REQUEST
          : result === "true"
          ? HttpStatuses.OK
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

import { Api } from "../classes/Api";
import { Helper } from "../classes/Helper";
import { ExternalApis } from "../constants/ExternalApis";
import { Messages } from "../constants/Messages";
import { IExternalApi, RequestMethod } from "../interfaces/IExternalApi";
import { empPersonalDetailsSchema } from "../models/empPersonalDetails.model";
import { loginInfoSchema } from "../models/login-info.model";
import { UserModel, UserSchema } from "../models/user.model";

export class AuthService {
  constructor() {}
  static async login(params: {
    mobileNumber: number;
    password: string;
    companyAlias: string;
  }) {
    try {
      params.password = Helper.hashPassword(params.password);
      let user: any = await UserSchema.findOne(params);
      let findUser: any = await empPersonalDetailsSchema.find({
        mobileNumber: params.mobileNumber,
      });
      if (!user) {
        Helper.throwError(Messages.WRONG_USERNAME_OR_PASSWORD_MESSAGE, null);
        return;
      }

      if (findUser && findUser[0] && findUser[0].isActive === false) {
        Helper.throwError("User is de-activated.");
        return;
      }
      user = user.toObject();
      user.companyId = params.companyAlias;
      user.accessToken = await Helper.generateLoginToken(user);
      return user;
    } catch (error: any) {
      Helper.throwError(Messages.WRONG_USERNAME_OR_PASSWORD_MESSAGE, error);
    }
  }

  static async employerRegister(
    employerRegisterParams:
      | {
          mobileNumber: number;
          password: string;
          fullName: string;
          ipAddress: string;
          parent: string;
          parentType: string;
          location: string;
          organizationName: string;
          userType: string;
          department: string;
          isRootUser: boolean;
        }
      | UserModel,
    callback: Function
  ) {
    try {
      console.log("reached here");
      await UserSchema.create(employerRegisterParams);
      callback(true);
    } catch (error: any) {
      console.log(error);
      Helper.throwError(error);
      callback(false);
    }
  }

  static async sendOtp(
    otpParams: {
      mobileNumber: string;
    },
    callback: Function
  ) {
    try {
      const api: IExternalApi = {
        url: `${ExternalApis.SEND_OTP.replace(
          "{mobileNumber}",
          otpParams.mobileNumber
        )}`,
        requestMethod: RequestMethod.GET,
        input: {},
        response: (res: any) => {
          callback(res);
        },
      };
      Api.callApi(api);
    } catch {
      callback(false);
    }
  }

  static async verifyOtp(
    verifyOtpParams: {
      sessionId: string;
      otpValue: string;
    },
    callback: Function
  ) {
    try {
      const api: IExternalApi = {
        url: `${ExternalApis.VERIFY_OTP.replace(
          "{otpValue}",
          verifyOtpParams.otpValue
        ).replace("{sessionId}", verifyOtpParams.sessionId)}`,
        requestMethod: RequestMethod.GET,
        input: {},
        response: (res: any) => {
          callback(res);
        },
        errorFunction: (error: any) => {
          callback(false);
        },
      };
      Api.callApi(api);
    } catch {
      callback(false);
    }
  }

  static async resetPassword(
    resetPasswordParams: {
      mobileNumber: number;
      password: string;
      otpValue: string;
      sessionId: string;
    },
    callback: Function
  ) {
    try {
      const api: IExternalApi = {
        url: `${ExternalApis.VERIFY_OTP.replace(
          "{otpValue}",
          resetPasswordParams.otpValue
        ).replace("{sessionId}", resetPasswordParams.sessionId)}`,
        requestMethod: RequestMethod.GET,
        input: {},
        response: async (res: any) => {
          const findUser = await UserSchema.find({
            mobileNumber: resetPasswordParams.mobileNumber,
          });
          if (
            findUser[0].password ===
            Helper.hashPassword(resetPasswordParams.password)
          ) {
            callback("oldPass");
          } else {
            await UserSchema.findByIdAndUpdate(findUser, {
              password: Helper.hashPassword(resetPasswordParams.password),
            });
            callback("true");
          }
        },
        errorFunction: (error: any) => {
          callback("false");
        },
      };
      Api.callApi(api);
    } catch {
      callback("false");
    }
  }

  static async changePassword(
    changePasswordParams: {
      newPassword: string;
      oldPassword: string;
    },
    userId: string,

    callback: Function
  ) {
    try {
      const changedPassword = await UserSchema.find({
        _id: userId,
      });

      const findPassword = changedPassword.map(function (getPassword) {
        return getPassword.toJSON().password;
      });

      if (
        findPassword[0] ===
        Helper.hashPassword(changePasswordParams.newPassword)
      ) {
        callback("oldPass");
      } else if (
        findPassword[0] ===
        Helper.hashPassword(changePasswordParams.oldPassword)
      ) {
        await UserSchema.findByIdAndUpdate(userId, {
          password: Helper.hashPassword(changePasswordParams.newPassword),
        });
        callback("true");
      } else {
        callback("false");
      }
    } catch {
      callback("false");
    }
  }

  //-------------------ADMIN-EMPLOYYEE-DETAIL-------------------
  static async configureCreateEmployeeDetail(
    adminDetailsParams: {
      fullName: String;
      emailId: string;
      selectDepartment: string;
      selectDocumentType: string;
      mobileNumber: Number;
      aadhaarNumber: string;
      selectRole: string;
      image: string;
    },
    callback: Function
  ) {
    try {
      const result = await UserSchema.create(adminDetailsParams);
      callback(true);
    } catch (error: any) {
      Helper.throwError(error);
      callback(false);
    }
  }

  static async configureUpdateEmployeeDetails(
    Id,
    employeeParams: {
      fullName: String;
      emailId: string;
      selectDepartment: string;
      selectDocumentType: string;
      mobileNumber: Number;
      aadhaarNumber: string;
      selectRole: string;
      image: string;
    },
    callback: Function
  ) {
    try {
      await UserSchema.findByIdAndUpdate(
        Id,
        employeeParams
        // {
        //   new: true,
        // }
      );
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async getemployeeDetails(callback: Function) {
    try {
      const result = await UserSchema.find({ isDelete: false });
      callback(result);
    } catch {
      callback(false);
    }
  }
}

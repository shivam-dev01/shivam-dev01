import { Helper } from "../classes/Helper";
import { setUpDbConnection } from "../config/dbConnection";
import { CompanyModel, CompanySchema } from "../models/company.model";
import { UserModel, UserSchema, UserType } from "../models/user.model";
import { AuthService } from "./auth.service";
export class CompanyService {
  constructor(callback: Function) {}
  static async create({
    params,
    userData,
  }: {
    params: CompanyModel;
    userData: {
      fullName: string;
      mobileNumber: number;
      location: string;
      ipAddress: string;
      password: string;
      employeeId: string;
    };
  }) {
    try {
      let result = await CompanySchema.create(params);
      await setUpDbConnection(params.companyAlias);
      const data: UserModel = {
        fullName: userData.fullName,
        password: userData.password,
        mobileNumber: userData.mobileNumber,
        ipAddress: userData.ipAddress,
        location: userData.location,
        employeeId: userData.employeeId,
        organizationName: params.companyName,
        userType: UserType.ROOT,
        profileUpdate: false,
        profileVerificationState: true,
      };

      AuthService.employerRegister(data, () => {
        console.log("Root user created successfully");
      });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while creating company", error);
    }
  }

  static async update(companyId: string, params: CompanyModel) {
    try {
      let result = await CompanySchema.findByIdAndUpdate(companyId, {
        ...params,
      });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while updating the company", error);
    }
  }

  static async delete(companyId: string) {
    try {
      let result = await CompanySchema.findByIdAndUpdate(companyId, {
        isDelete: true,
      });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while deleting company", error);
    }
  }

  static async fetch() {
    try {
      let result = await CompanySchema.find({ isDelete: false });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while fetch company", error);
    }
  }
}

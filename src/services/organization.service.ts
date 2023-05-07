import { Helper } from "../classes/Helper";
import { organizationSchema } from "../models/organization.model";
import { UserSchema } from "../models/user.model";

export class organizationService {
  constructor() {}

  static async organizationDetails(
    params: {
      adminName: string;
      mobileNumber: number;
      organizationName: string;
      designation: string;
      organizationType: string;
      officialMobileNumber: number;
      businessWebsite: string;
      businessPanCardNumber: string;
      gstNumber: string;
      organizationAddress: string;
      businessEmail: string;
    },
    callback: Function
  ) {
    try {
      const data = await UserSchema.find({
        mobileNumber: params.mobileNumber,
        fullName: params.adminName,
        organizationName: params.organizationName,
      });
      if (data && data.length) {
        const result = await organizationSchema.create(params);
        callback(result);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async getOrganizationDetails(callback: Function) {
    try {
      const result = await organizationSchema
        .find({})
        .sort({ createdAt: -1 })
        .limit(1);
      callback(result);
    } catch {
      callback(false);
    }
  }
}

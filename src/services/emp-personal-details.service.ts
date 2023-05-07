import { Helper } from "../classes/Helper";
import { empPersonalDetailsSchema } from "../models/empPersonalDetails.model";
import { UserSchema } from "../models/user.model";

export class empPersonalDetailsService {
  constructor() {}

  // static async empPersonalDetails(
  //   params: {
  //     fullName: string;
  //     mobileNumber: number;
  //     emailId: string;
  //     gender: string;
  //     DOB: string;
  //     maritalStatus: string;
  //     department: string;
  //     jobRole: string;
  //     organizationName: string;
  //     bankName: string;
  //     accountNumber: number;
  //     ifscCode: string;
  //     branchName: string;
  //     guardianName: string;
  //     guardianMobileNumber: number;
  //     alternateGuardianName: string;
  //     alternateGuardianMobileNumber: number;
  //     educationDetails: any;
  //     permanentAddress: any;
  //     currentAddress: any;
  //     aadhaarNumber: number;
  //     panCardNumber: string;
  //     passportNumber: string;
  //     employeeId: string;
  //     profileImage: string;
  //   },
  //   callback: Function
  // ) {
  //   try {
  //     const userTableData = await UserSchema.find({
  //       mobileNumber: params.mobileNumber,
  //       emailId: params.emailId,
  //       department: params.department,
  //       jobRole: params.jobRole,
  //       fullName: params.fullName,
  //       aadhaarNumber: params.aadhaarNumber,
  //     });
  //     if (userTableData && userTableData.length) {
  //       params.employeeId = userTableData[0].employeeId;
  //       const result = await empPersonalDetailsSchema.create(params);
  //       await UserSchema.findByIdAndUpdate(userTableData[0].id, {
  //         profileUpdate: true,
  //       });
  //       callback(result);
  //     } else {
  //       callback(false);
  //     }
  //   } catch {
  //     callback(false);
  //   }
  // }

  static async empUpdatePersonalDetails(
    Id,
    params: {
      fullName: string;
      mobileNumber: number;
      emailId: string;
      gender: string;
      DOB: string;
      maritalStatus: string;
      department: string;
      jobRole: string;
      organizationName: string;
      accountHolderName: string;
      bankName: string;
      accountNumber: number;
      ifscCode: string;
      branchName: string;
      guardianName: string;
      guardianMobileNumber: number;
      alternateGuardianName: string;
      alternateGuardianMobileNumber: number;
      educationDetails: any;
      educationDetails1: any;
      educationDetails2: any;
      educationDetails3: any;
      permanentAddress: any;
      currentAddress: any;
      selectDocumentType: string;
      documentsNumber: string;
      // aadhaarNumber: number;
      // panCardNumber: string;
      // passportNumber: string;
      profileImage: string;
      documents: string;
      bloodGroup: string;
      accountHolderName1: string;
      bankName1: string;
      accountNumber1: number;
      ifscCode1: string;
      branchName1: string;
      accountHolderName2: string;
      bankName2: string;
      accountNumber2: number;
      ifscCode2: string;
      branchName2: string;
    },
    callback: Function
  ) {
    try {
      const userTableData = await UserSchema.find({
        _id: Id,
      });

      const result = await empPersonalDetailsSchema.find({
        employeeId: userTableData[0].employeeId,
      });
      await empPersonalDetailsSchema.findByIdAndUpdate(result[0].id, {
        gender: params.gender,
        DOB: params.DOB,
        maritalStatus: params.maritalStatus,
        accountHolderName: params.accountHolderName,
        bankName: params.bankName,
        accountNumber: params.accountNumber,
        ifscCode: params.ifscCode,
        branchName: params.branchName,
        guardianName: params.guardianName,
        guardianMobileNumber: params.guardianMobileNumber,
        alternateGuardianName: params.alternateGuardianName,
        alternateGuardianMobileNumber: params.alternateGuardianMobileNumber,
        educationDetails: params.educationDetails,
        educationDetails1: params.educationDetails1,
        educationDetails2: params.educationDetails2,
        educationDetails3: params.educationDetails3,
        permanentAddress: params.permanentAddress,
        currentAddress: params.currentAddress,
        selectDocumentType: params.selectDocumentType,
        documentsNumber: params.documentsNumber,
        // panCardNumber: params.panCardNumber,
        // passportNumber: params.passportNumber,
        profileImage: params.profileImage,
        documents: params.documents,
        bloodGroup: params.bloodGroup,
        accountHolderName1: params.accountHolderName1,
        bankName1: params.bankName1,
        accountNumber1: params.accountNumber1,
        ifscCode1: params.ifscCode1,
        branchName1: params.branchName1,
        accountHolderName2: params.accountHolderName2,
        bankName2: params.bankName2,
        accountNumber2: params.accountNumber2,
        ifscCode2: params.ifscCode2,
        branchName2: params.branchName2,
      });
      await UserSchema.findByIdAndUpdate(Id, {
        profileUpdate: true,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async empGetPersonalDetails(callback: Function) {
    try {
      const result = await empPersonalDetailsSchema.find({});
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async empGetSpecifiedPersonalDetails(
    mobileNumber,
    callback: Function
  ) {
    try {
      const result = await empPersonalDetailsSchema.find({
        mobileNumber: mobileNumber,
      });
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async employeeProfileDetails(
    EmployeeId,
    About,
    Account,
    Additional,
    callback: Function
  ) {
    try {
      if (!EmployeeId && !About && !Account && !Additional) {
        const result = await empPersonalDetailsSchema.find({});
        callback(result);
      }

      if (EmployeeId && !About && !Account && !Additional) {
        const result = await empPersonalDetailsSchema.find({
          employeeId: EmployeeId,
        });
        callback(result);
      }

      if (EmployeeId && About && !Account && !Additional) {
        const result = await empPersonalDetailsSchema
          .find({ employeeId: EmployeeId })
          .select([
            "mobileNumber",
            "emailId",
            "gender",
            "maritalStatus",
            "DOB",
            "bloodGroup",
            "organizationName",
            "department",
            "jobRole",
            "approvalState",
            "profileImage",
            "remark",
            "fullName",
          ]);
        callback(result);
      }
      if (EmployeeId && !About && Account && !Additional) {
        const result = await empPersonalDetailsSchema
          .find({ employeeId: EmployeeId })
          .select([
            "accountHolderName",
            "branchName",
            "ifscCode",
            "accountNumber",
            "bankName",
            "accountHolderName1",
            "branchName1",
            "ifscCode1",
            "accountNumber1",
            "bankName1",
            "accountHolderName2",
            "branchName2",
            "ifscCode2",
            "accountNumber2",
            "bankName2",
            "approvalState",
            "profileImage",
            "remark",
            "fullName",
          ]);
        callback(result);
      }
      if (EmployeeId && !About && !Account && Additional) {
        const result = await empPersonalDetailsSchema
          .find({ employeeId: EmployeeId })
          .select([
            "assignedShift",
            "documents",
            "guardianName",
            "guardianMobileNumber",
            "alternateGuardianName",
            "alternateGuardianMobileNumber",
            "educationDetails",
            "educationDetails1",
            "educationDetails2",
            "educationDetails3",
            "permanentAddress",
            "currentAddress",
            "documentsNumber",
            "selectDocumentType",
            // "aadhaarNumber",
            // "panCardNumber",
            // "passportNumber",
            "approvalState",
            "profileImage",
            "remark",
            "fullName",
          ]);
        callback(result);
      }
    } catch {
      callback(false);
    }
  }
}

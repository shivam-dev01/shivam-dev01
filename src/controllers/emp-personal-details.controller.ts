import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { empPersonalDetailsService } from "../services/emp-personal-details.service";

// export const empPersonalDetails = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const data = {
//       fullName: body.fullName,
//       mobileNumber: body.mobileNumber,
//       emailId: body.emailId,
//       gender: body.gender,
//       DOB: body.DOB,
//       maritalStatus: body.maritalStatus,
//       department: body.department,
//       jobRole: body.jobRole,
//       organizationName: body.organizationName,
//       bankName: body.bankName,
//       accountNumber: body.accountNumber,
//       ifscCode: body.ifscCode,
//       branchName: body.branchName,
//       guardianName: body.guardianName,
//       guardianMobileNumber: body.guardianMobileNumber,
//       alternateGuardianName: body.alternateGuardianName,
//       alternateGuardianMobileNumber: body.alternateGuardianMobileNumber,
//       educationDetails: body.educationDetails,
//       permanentAddress: body.permanentAddress,
//       currentAddress: body.currentAddress,
//       aadhaarNumber: body.aadhaarNumber,
//       panCardNumber: body.panCardNumber,
//       passportNumber: body.passportNumber,
//       employeeId: body.employeeId,
//       profileImage: body.profileImage,
//     };
//     empPersonalDetailsService.empPersonalDetails(data, (result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Employee details saved successfully." : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

export const empUpdatePersonalDetails = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      fullName: body.fullName,
      mobileNumber: body.mobileNumber,
      emailId: body.emailId,
      gender: body.gender,
      DOB: body.DOB,
      maritalStatus: body.maritalStatus,
      department: body.department,
      jobRole: body.jobRole,
      organizationName: body.organizationName,
      accountHolderName: body.accountHolderName,
      bankName: body.bankName,
      accountNumber: body.accountNumber,
      ifscCode: body.ifscCode,
      branchName: body.branchName,
      guardianName: body.guardianName,
      guardianMobileNumber: body.guardianMobileNumber,
      alternateGuardianName: body.alternateGuardianName,
      alternateGuardianMobileNumber: body.alternateGuardianMobileNumber,
      educationDetails: body.educationDetails,
      educationDetails1: body.educationDetails1,
      educationDetails2: body.educationDetails2,
      educationDetails3: body.educationDetails3,
      permanentAddress: body.permanentAddress,
      currentAddress: body.currentAddress,
      selectDocumentType: body.selectDocumentType,
      documentsNumber: body.documentsNumber,
      // aadhaarNumber: body.aadhaarNumber,
      // panCardNumber: body.panCardNumber,
      // passportNumber: body.passportNumber,
      profileImage: body.profileImage,
      documents: body.documents,
      bloodGroup: body.bloodGroup,
      accountHolderName1: body.accountHolderName1,
      bankName1: body.bankName1,
      accountNumber1: body.accountNumber1,
      ifscCode1: body.ifscCode1,
      branchName1: body.branchName1,
      accountHolderName2: body.accountHolderName2,
      bankName2: body.bankName2,
      accountNumber2: body.accountNumber2,
      ifscCode2: body.ifscCode2,
      branchName2: body.branchName2,
    };
    empPersonalDetailsService.empUpdatePersonalDetails(
      req.params.id,
      data,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee details updated successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const empGetPersonalDetails = async (req: Request, res: Response) => {
  try {
    empPersonalDetailsService.empGetPersonalDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Employee details fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const empGetSpecifiedPersonalDetails = async (
  req: Request,
  res: Response
) => {
  try {
    empPersonalDetailsService.empGetSpecifiedPersonalDetails(
      req.params.mobileNumber,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee details fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const employeeProfileDetails = async (req: Request, res: Response) => {
  try {
    empPersonalDetailsService.employeeProfileDetails(
      req.query.employeeId,
      req.query.ABOUT,
      req.query.ACCOUNT,
      req.query.ADDITIONAL,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee details fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

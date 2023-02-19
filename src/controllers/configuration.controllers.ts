import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { ConfigurationType } from "../models/connfiguration.model";
import { ConfigurationService } from "../services/configuration.service";

export const configureEmployeeId = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const data = {
      employeeId: body.employeeId,
      configurationType: ConfigurationType.EMPLOYEE_ID,
    };

    ConfigurationService.configureEmployId(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Employee id formate created successfully" : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const configureUpdateEmployeeId = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;
    const data = {
      employeeId: body.employeeId,
    };

    ConfigurationService.configureUpdateEmpId(
      req.params.id,
      data,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee id updated successfully" : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const configureGetEmployeeId = async (req: Request, res: Response) => {
  try {
    ConfigurationService.configureGetEmpId((result: any) => {
      new HttpResponse(
        res,
        result ? "Employee id fetched successfully" : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const configureAttendanceTime = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      officeInStartTime: body.officeInStartTime,
      officeInEndTime: body.officeInEndTime,
      officeOutStartTime: body.officeOutStartTime,
      officeOutEndTime: body.officeOutEndTime,
      weekOff: body.weekOff,
      shiftType: body.shiftType,
      configurationType: ConfigurationType.ATTENDANCE,
    };

    ConfigurationService.configureAttendanceTime(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Office timing configured successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const configureUpdateAttendanceTime = async (
  req: Request,
  res: Response
) => {
  try {
    const body = req.body;
    const data = {
      officeInStartTime: body.officeInStartTime,
      officeInEndTime: body.officeInEndTime,
      officeOutStartTime: body.officeOutStartTime,
      officeOutEndTime: body.officeOutEndTime,
      weekOff: body.weekOff,
    };

    ConfigurationService.configureUpdateAttendanceTime(
      req.params.id,
      data,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Configuration timing Updated successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const configureGetAttendanceTime = async (
  req: Request,
  res: Response
) => {
  try {
    ConfigurationService.configureGetAttendanceTime((result: any) => {
      new HttpResponse(
        res,
        result ? "Attendance details fetched successfully" : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

// //-----------------------------CONFIGURE-ADMIN-DETAILS-----------------------------------

// export const configureAdminDetails = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;

//     const data = {
//       fullName: body.fullName,
//       mobileNumber: body.mobileNumber,
//       alternateMobileNumber: body.alternateMobileNumber,
//       emailId: body.emailId,
//       aadhaarNumber: body.aadhaarNumber,
//       personalAddress: body.personalAddress,
//       organisationName: body.organisationType,
//       desigination: body.desigination,
//       organisationType: body.organisationType,
//       officialPhoneNumber: body.officialPhoneNumber,
//       businessWebsite: body.businessWebsite,
//       businessEmail: body.businessEmail,
//       businessPanNumber: body.businessPanNumber,
//       gstNumber: body.gstNumber,
//       organisationAddress: body.organisationAddress,
//     };

//     ConfigurationService.adminDetail(data, (result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Admin details created successfully" : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error: any) {
//     Helper.throwError(error);
//   }
// };

// export const getAdminDetails = async (req: Request, res: Response) => {
//   try {
//     ConfigurationService.getAdminDetails((result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Admin Details fetched successfully." : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

// export const configureUpdateAdminDetails = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const body = req.body;
//     const data = {
//       fullName: body.fullName,
//       mobileNumber: body.mobileNumber,
//       alternateMobileNumber: body.alternateMobileNumber,
//       emailId: body.emailId,
//       aadhaarNumber: body.aadhaarNumber,
//       personalAddress: body.personalAddress,
//       organisationName: body.organisationType,
//       desigination: body.desigination,
//       organisationType: body.organisationType,
//       officialPhoneNumber: body.officialPhoneNumber,
//       businessWebsite: body.businessWebsite,
//       businessEmail: body.businessEmail,
//       businessPanNumber: body.businessPanNumber,
//       gstNumber: body.gstNumber,
//       organisationAddress: body.organisationAddress,
//     };

//     ConfigurationService.configureUpdateAdminDetails(
//       req.params.id,
//       data,
//       (result: any) => {
//         new HttpResponse(
//           res,
//         result ? "Admin details updated successfully" : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//         ).sendResponse();
//       }
//     );
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

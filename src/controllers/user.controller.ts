import { HttpResponse } from "../classes/HttpResponse";
import { userServices } from "../services/user.service";
import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { UserType } from "../models/user.model";
import { Messages } from "../constants/Messages";
import { AttendanceModel } from "../models/attendance.model";
import { ApprovalState } from "../models/empPersonalDetails.model";

//---------------------------CONFIGUREEMPLOYEE-DETAILS------------------------------------
export const createEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const data = {
      fullName: body.fullName,
      emailId: body.emailId,
      department: body.department,
      selectDocumentType: body.selectDocumentType,
      documentsNumber: body.documentsNumber,
      mobileNumber: body.mobileNumber,
      aadhaarNumber: body.aadhaarNumber,
      jobRole: body.jobRole,
      employeeId: body.employeeId,
      password: body.password,
      documents: body.documents,
      userType: UserType.EMPLOYEE,
      profileUpdate: false,
      profileVerificationState: false,
    };

    userServices.createEmployeeDetail(data, (result: any) => {
      new HttpResponse(
        res,
        result === "config"
          ? "You have not configured employee Id."
          : result === "false"
          ? "Error while creating employee."
          : result === "idExists"
          ? "Error while generating employee id, please generate another employee id."
          : result === "true"
          ? "Employee details created successfully."
          : "Error while creating employee.",
        result,
        result === "config"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "idExists"
          ? HttpStatuses.BAD_REQUEST
          : result === "true"
          ? HttpStatuses.OK
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const updateEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const data = {
      fullName: body.fullName,
      emailId: body.emailId,
      department: body.department,
      selectDocumentType: body.selectDocumentType,
      mobileNumber: body.mobileNumber,
      aadhaarNumber: body.aadhaarNumber,
      jobRole: body.jobRole,
      documents: body.documents,
      salarySlab: body.salarySlab,
    };

    userServices.updateEmployeeDetails(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Employee details updated successfully."
          : result === "salary"
          ? "Salary slab assigned successfully."
          : result === "false"
          ? "Failed."
          : result === "not"
          ? "Salary slab not exists."
          : "Failed.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "salary"
          ? HttpStatuses.OK
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const getAllEmployeeDetails = async (req: Request, res: Response) => {
  try {
    userServices.getAllEmployeeDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Employee details fetched  successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getspecifiedEmployeeDetails = async (
  req: Request,
  res: Response
) => {
  try {
    userServices.getSpecificEmployeeDetails(
      req.params.userId,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee details get  successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const employeeStatus = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      status: body.status,
    };
    userServices.employeeStatus(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "activate"
          ? "Employee activated successfully."
          : result === "deactivate"
          ? "Employee deactivated successfully."
          : "Failed.",
        result,
        result === "activate"
          ? HttpStatuses.OK
          : result === "deactivate"
          ? HttpStatuses.OK
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const loginInfo = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    fullName: body.fullName,
    mobileNumber: body.mobileNumber,
    employeeId: body.employeeId,
    loginInTime: body.loginInTime,
    logoutTime: body.logoutTime,
    ipAddress: body.ipAddress,
    location: body.location,
    deviceId: body.deviceId,
    // activeHours: body.activeHours,
  };
  try {
    await userServices.loginInfo(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "login info saved successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const userStatus = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    approvalState: body.approvalState,
    remark: body.remark,
  };
  try {
    await userServices.userStatus(
      req.params.id,
      req.params.mobileNumber,
      data,
      (result: any) => {
        new HttpResponse(
          res,
          result === ApprovalState.REJECTED
            ? "User details rejected."
            : result === ApprovalState.APPROVED
            ? "User details verified successfully."
            : result === "false"
            ? "Failed."
            : "Failed.",
          result,
          result === ApprovalState.REJECTED
            ? HttpStatuses.OK
            : result === ApprovalState.APPROVED
            ? HttpStatuses.OK
            : result === "false"
            ? HttpStatuses.BAD_REQUEST
            : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const generateEmployeeId = async (req: Request, res: Response) => {
  try {
    userServices.generateEmployeeId((result: any) => {
      new HttpResponse(
        res,
        result === "config"
          ? "You have not configured employee id."
          : result === "false"
          ? "Failed."
          : "Employee id generated successfully.",
        result,
        result === "config"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.OK
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const lastGeneratedEmpId = async (req: Request, res: Response) => {
  try {
    userServices.lastGeneratedEmpId((result: any) => {
      new HttpResponse(
        res,
        result === "config"
          ? "You have not configured employee Id."
          : result === "false"
          ? "Failed"
          : "Employee id fetched successfully.",
        result,
        result === "config"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.OK
      ).sendResponse();
    });
  } catch (error: any) {
    Helper.throwError(error);
  }
};

export const markAttendance = async (req: Request, res: Response) => {
  const body = req.body;
  const attendanceData = {
    userId: body.userId,
    workReport: body.workReport,
    attendanceType: body.attendanceType,
    checkOutTime: body.checkOutTime,
    checkInTime: body.checkInTime,
    date: body.date,
    todaysWork: body.todaysWork,
  };

  try {
    userServices.markAttendance(attendanceData, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Attendance marked successfully."
          : result === "already"
          ? "Attendance already marked."
          : result === "holiday"
          ? "Holiday, Attendance can not marked"
          : result === "leave"
          ? "Leave day, Attendance can not marked."
          : result === "false"
          ? "Attendance can not marked."
          : result === "reportAlready"
          ? "Report has been already submitted."
          : result === "weekOff"
          ? "Week off days, attendance can not marked."
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "already"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "holiday"
          ? HttpStatuses.BAD_REQUEST
          : result === "reportAlready"
          ? HttpStatuses.BAD_REQUEST
          : result === "leave"
          ? HttpStatuses.BAD_REQUEST
          : result === "weekOff"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getAdminProfileDetails = async (req: Request, res: Response) => {
  try {
    userServices.getAdminProfileDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Admin details fetched  successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      gender: body.gender,
      emailId: body.emailId,
      aadhaarNumber: body.aadhaarNumber,
      DOB: body.DOB,
      panCardNumber: body.panCardNumber,
      personalAddress: body.personalAddress,
      alternateMobileNumber: body.alternateMobileNumber,
      alternateEmailId: body.alternateEmailId,
    };
    userServices.updateAdminProfile(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Admin updated successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getLastLoginTime = async (req: Request, res: Response) => {
  try {
    userServices.getLastLoginTime(req.params.mobileNumber, (result: any) => {
      new HttpResponse(
        res,
        result ? "Last login time fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const assignShift = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      assignShift: body.assignShift,
    };
    userServices.assignShift(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Shift assigned successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    userServices.getAttendanceReport(
      req.query.userId,
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getSingleReport = async (req: Request, res: Response) => {
  try {
    userServices.getSingleReport(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Attendance report fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getCustomReport = async (req: Request, res: Response) => {
  try {
    userServices.getCustomReport(
      req.query.department,
      req.query.date,
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getCustomEmployeeList = async (req: Request, res: Response) => {
  try {
    userServices.getCustomEmployeeList(
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Employee list fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const filteredEmployee = async (req: Request, res: Response) => {
  try {
    userServices.filteredEmployee(
      req.query.assignedShift,
      req.query.department,
      req.query.jobRole,
      (result: any) => {
        new HttpResponse(
          res,
          result.length >= 1
            ? "Employee list fetched successfully."
            : result.length === 0
            ? "No records found."
            : "Error while fetching employee list.",
          result,
          result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const attendanceReport = async (req: Request, res: Response) => {
  try {
    userServices.attendanceReport(
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const employeeAttendanceReport = async (req: Request, res: Response) => {
  try {
    userServices.employeeAttendanceReport(
      req.query.userId,
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const searchEmployee = async (req: Request, res: Response) => {
  try {
    userServices.searchEmployee(req.query.text, (result: any) => {
      new HttpResponse(
        res,
        result ? "Employee list fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const searchAttendance = async (req: Request, res: Response) => {
  try {
    userServices.searchAttendance(req.query.text, (result: any) => {
      new HttpResponse(
        res,
        result ? "Attendance fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const employeeSearchAttendance = async (req: Request, res: Response) => {
  try {
    userServices.employeeSearchAttendance(
      req.query.userId,
      req.query.text,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      profileImage: body.profileImage,
    };
    userServices.uploadImage(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Profile image uploaded successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const adminUploadImage = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      profileImage: body.profileImage,
    };
    userServices.adminUploadImage(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Profile image uploaded successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const monthlyYearlyAttendanceReport = async (
  req: Request,
  res: Response
) => {
  try {
    userServices.monthlyYearlyAttendanceReport(
      req.query.userId,
      req.query.month,
      req.query.year,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Attendance report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const monthlyYearlyCompleteReport = async (
  req: Request,
  res: Response
) => {
  try {
    userServices.monthlyYearlyCompleteReport(
      req.query.userId,
      req.query.month,
      req.query.year,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Report fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const observerRemark = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      remarkBy: body.remarkBy,
      observerRemark: body.observerRemark,
    };
    userServices.observerRemark(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result
          ? "Remark updated successfully."
          : "Error while updating remark.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const removeObserverRemark = async (req: Request, res: Response) => {
  try {
    userServices.removeObserverRemark(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result
          ? "Remark removed successfully."
          : "Error while removing remark.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const generateMonthlyReport = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      userId: body.userId,
      monthlyReport: body.monthlyReport,
      month: body.month,
    };

    userServices.generateMonthlyReport(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Report generated successfully."
          : result === "holiday"
          ? "First create holiday for this month."
          : result === "slab"
          ? "First assign salary slab to this user."
          : result === "false"
          ? "Error while generating report."
          : result === "generated"
          ? "Report already generated for this month."
          : "Error while generating report.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "slab"
          ? HttpStatuses.MOVED
          : result === "holiday"
          ? HttpStatuses.MOVED
          : result === "generated"
          ? HttpStatuses.CONFLICT
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      paymentStatus: body.paymentStatus,
      salaryCreditedDate: body.salaryCreditedDate,
      bankRRNNumber: body.bankRRNNumber,
    };
    userServices.updatePaymentStatus(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Payment status updated successfully."
          : result === "credited"
          ? "Payment status already updated."
          : result === "false"
          ? "Error while updating payment status."
          : "Error while updating payment status.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "credited"
          ? HttpStatuses.CONFLICT
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
    // userServices.updatePaymentStatus(req.params.userId, data, (result: any) => {
    //   new HttpResponse(
    //     res,
    //     result === "true"
    //       ? "Payment status updated successfully."
    //       : result === "false"
    //       ? "Error while updating payment status."
    //       : result === "report"
    //       ? "First generate monthly report of this user."
    //       : result === "salary"
    //       ? "First assign salary slab to this user."
    //       : "Error while updating status",
    //     result,
    //     result === "true" ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    //   ).sendResponse();
    // });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const generateSalarySlip = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      salarySlip: body.salarySlip,
    };
    userServices.generateSalarySlip(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Salary slip generated successfully."
          : result === "false"
          ? "Error while generating salary slip."
          : result === "generated"
          ? "Pay slip already generated for this month."
          : result === "status"
          ? "First update salary status."
          : "Error while generating salary slip.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "generated"
          ? HttpStatuses.CONFLICT
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "status"
          ? HttpStatuses.MOVED
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const filterEmployee = async (req: Request, res: Response) => {
  try {
    userServices.filterEmployee(
      req.query.department,
      req.query.jobRole,
      req.query.employeeId,
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result
            ? "Employee details fetched successfully."
            : "Error while fetching employee details.",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const fetchMonthlyReport = async (req: Request, res: Response) => {
  try {
    userServices.fetchMonthlyReport(req.query.userId, (result: any) => {
      new HttpResponse(
        res,
        result.length >= 1
          ? "Reports fetched fetched successfully."
          : result.length === 0
          ? "Not found."
          : "Error while fetching reports.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

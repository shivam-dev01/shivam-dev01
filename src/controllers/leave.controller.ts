import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { leaveService } from "../services/leave.service";

export const applyLeave = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      userId: body.userId,
      fromDate: body.fromDate,
      toDate: body.toDate,
      subject: body.subject,
      description: body.description,
    };
    leaveService.applyLeave(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "leave request send successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const leaveRequestList = async (req: Request, res: Response) => {
  try {
    leaveService.leaveRequestList(
      req.query.userId,
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "leave request list fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const adminLeaveRequestList = async (req: Request, res: Response) => {
  try {
    leaveService.adminLeaveRequestList(
      req.query.page,
      req.query.limit,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "leave request list fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateLeave = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      leaveApprovalState: body.leaveApprovalState,
      remark: body.remark,
    };
    leaveService.updateLeave(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Leave status updated successfully."
          : result === "false"
          ? "Error while updating leave"
          : result === "remarks"
          ? "Remark missing"
          : "Error while updating leave",
        result,
        result === "true" ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const adminGetSeparateLeaveRequestList = async (
  req: Request,
  res: Response
) => {
  try {
    leaveService.adminGetSeparateLeaveRequestList(
      req.params.id,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Leave request list fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const leaveSearch = async (req: Request, res: Response) => {
  try {
    leaveService.leaveSearch(req.query.text, (result: any) => {
      new HttpResponse(
        res,
        result ? "Leave request list fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const employeeLeaveSearch = async (req: Request, res: Response) => {
  try {
    leaveService.employeeLeaveSearch(
      req.query.userId,
      req.query.text,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Leave request list fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const filterLeaveRequests = async (req: Request, res: Response) => {
  try {
    leaveService.filterLeaveRequests(
      req.query.userId,
      req.query.status,
      (result: any) => {
        new HttpResponse(
          res,
          result.length === 0
            ? "No records found."
            : result.length >= 1
            ? "Leave requests fetched successfully."
            : "Error while fetching leave requests.",
          result,
          result.length === 0
            ? HttpStatuses.OK
            : result.length >= 1
            ? HttpStatuses.OK
            : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

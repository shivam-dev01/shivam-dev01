import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { departmentModel } from "../models/department.model";
import { departmentService } from "../services/department.service";

export const addDepartment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      department: body.department,
    };
    departmentService.addDepartment(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Department added successfully."
          : result === "exist"
          ? "Department already exist."
          : result === "false"
          ? "Failed"
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "exist"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      department: body.department,
    };

    departmentService.updateDepartment(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Department updated successfully."
          : result === "exist"
          ? "Department already exist."
          : result === "false"
          ? "Failed."
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "exist"
          ? HttpStatuses.BAD_REQUEST
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    departmentService.deleteDepartment(
      req.params.id,
      isDelete,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Department deleted successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getDepartmentDetails = async (req: Request, res: Response) => {
  try {
    departmentService.getDepartmentDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Department fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const adminSaveDepartment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      departmentId: body.departmentId,
    };
    departmentService.adminSaveDepartment(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Department saved successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const adminUpdateDepartment = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      departmentId: body.departmentId,
    };
    departmentService.adminUpdateDepartment(
      req.params.id,
      data,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Department updated successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

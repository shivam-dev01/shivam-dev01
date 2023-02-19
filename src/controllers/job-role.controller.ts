import { id } from "aws-sdk/clients/datapipeline";
import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { jobRoleModel } from "../models/jobRole.model";
import { jobRoleService } from "../services/job-role.service";

export const addJobRole = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      jobRole: body.jobRole,
      departmentId: body.departmentId,
    };
    jobRoleService.addJobRole(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Job role added successfully."
          : result === "exist"
          ? "Job role already exist."
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
export const updateJobRole = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      jobRole: body.jobRole,
      departmentId: body.departmentId,
    };

    jobRoleService.updateJobRole(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Job role updated successfully."
          : result === "exist"
          ? "Job role already exist."
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

export const deleteJobRole = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    jobRoleService.deleteJobRole(req.params.id, isDelete, (result: any) => {
      new HttpResponse(
        res,
        result ? "Job role deleted successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getJobRoles = async (req: Request, res: Response) => {
  try {
    jobRoleService.getJobRole((result: any) => {
      new HttpResponse(
        res,
        result ? "Job role fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getJobRole = async (req: Request, res: Response) => {
  try {
    jobRoleService.getJobRoleByDep(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Job role fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

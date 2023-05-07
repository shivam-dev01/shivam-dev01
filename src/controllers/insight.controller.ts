import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { insightService } from "../services/insight.service";
import { jobRoleService } from "../services/job-role.service";

export const createInsight = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      insightName: body.insightName,
      insightDescription: body.insightDescription,
      insightTypeId:body.insightTypeId
    };
    insightService.createInsight(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Insight name created successfully."
          : result === "exist"
          ? "Insight name already exist."
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
export const updateInsight = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      insightName: body.insightName,
      insightDescription: body.insightDescription,
      insightTypeId:body.insightTypeId
    };

    insightService.updateInsight(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Insight updated successfully."
          : result === "exist"
          ? "Insight already exist."
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

export const deleteInsight = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    insightService.deleteInsight(req.params.id, isDelete, (result: any) => {
      new HttpResponse(
        res,
        result ? "Insight deleted successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getInsight = async (req: Request, res: Response) => {
  try {
    insightService.getInsight((result: any) => {
      new HttpResponse(
        res,
        result ? "Insight fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

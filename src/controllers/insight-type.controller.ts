import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { insightTypeService } from "../services/insight-type.service";

export const createInsightType = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      insightType: body.insightType,
    };
    insightTypeService.createInsightType(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Insight type created successfully."
          : result === "exist"
          ? "Insight type already exist."
          : result === "false"
          ? "Failed"
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "exist"
          ? HttpStatuses.BAD_REQUEST
          : null
      ).sendResponse();
    });
  } catch {}
};
export const updateInsightType = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      insightType: body.insightType,
    };

    insightTypeService.updateInsightType(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Insight updated successfully."
          : result === "exist"
          ? "Insight type already exist."
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

export const deleteInsightType = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    insightTypeService.deleteInsightType(
      req.params.id,
      isDelete,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Insight type deleted successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getInsightTypeDetails = async (req: Request, res: Response) => {
  try {
    insightTypeService.getInsightTypeDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Insight type fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
}
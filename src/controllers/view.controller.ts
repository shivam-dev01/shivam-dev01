import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { ViewService } from "../services/view.service";

export const getViews = async (req: Request, res: Response) => {
  try {
    const result = await ViewService.fetch();
    new HttpResponse(res, "Views fetched successfully", result).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteViews = async (req: Request, res: Response) => {
  const viewId = req.params.viewId;
  try {
    const result = await ViewService.delete(viewId);
    new HttpResponse(
      res,
      result ? "View deleted successfully." : "Error while deleting view",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateViews = async (req: Request, res: Response) => {
  const body = req.body;
  const viewId = req.params.viewId;

  try {
    const result = await ViewService.update(viewId, body);
    new HttpResponse(
      res,
      result ? "View updated successfully" : "Error while updating the view",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const createViews = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    viewName: body.viewName,
  };
  try {
    const result = await ViewService.create(data);
    new HttpResponse(
      res,
      result ? "View Created Successfully" : "Error while creating view",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

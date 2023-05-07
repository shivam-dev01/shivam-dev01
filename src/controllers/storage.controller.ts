import { Request, Response } from "express";
import { CloudStorage, PRESIGNED_URL_TYPE } from "../classes/CloudStorage";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";

export const getSignedUrl = async (req: Request, res: Response) => {
  const fileName = req.query.fileName.toString();
  const actionType = req.query.actionType as PRESIGNED_URL_TYPE;

  const result = await new CloudStorage().generateUrl(actionType, fileName);

  new HttpResponse(res, "Url fetched successfully.", result).sendResponse();
};

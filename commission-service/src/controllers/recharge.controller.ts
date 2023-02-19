import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RechargeService } from "../services/recharge.service";

export const recharge = async (req: Request, res: Response) => {
  // const result = await RechargeService.fetchReport("sh");

  new HttpResponse(
    res,
    "Response from commission controller",
    []
  ).sendResponse();
};

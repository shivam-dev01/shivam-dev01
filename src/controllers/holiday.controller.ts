import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { holidayService } from "../services/holiday.service";

export const addHoliday = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      month: body.month,
      year: body.year,
      name: body.name,
      holidayDate: body.holidayDate,
      description: body.description,
      date: body.date,
    };
    holidayService.addHoliday(body, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Holiday added successfully."
          : result === "already"
          ? "Holiday already exist."
          : result === "false"
          ? "Failed."
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "already"
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

export const getHolidayList = async (req: Request, res: Response) => {
  try {
    holidayService.getHolidayList(
      req.query.month,
      req.query.year,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Holiday details fetched successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const removeHoliday = async (req: Request, res: Response) => {
  try {
    holidayService.removeHoliday(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Holiday removed successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateHoliday = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      name: body.name,
      date: body.date,
      description: body.description,
    };
    holidayService.updateHoliday(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Holiday updated successfully."
          : result === "already"
          ? "Holiday already exist."
          : result === "false"
          ? "Failed."
          : null,
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "already"
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

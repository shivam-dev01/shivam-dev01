import { query, Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { salarySlabService } from "../services/salary-slab.service";

export const addSalarySlab = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      slabName: body.slabName,
      basicSalary: body.basicSalary,
      pfDeduction: body.pfDeduction,
      esiDeduction: body.esiDeduction,
      houseRentAllowance: body.houseRentAllowance,
      medicalAllowance: body.medicalAllowance,
      travelAllowance: body.travelAllowance,
      foodReimbursement: body.foodReimbursement,
      specialAllowance: body.specialAllowance,
      grossCompensation: body.grossCompensation,
      value1: body.value1,
      value2: body.value2,
      value3: body.value3,
      value4: body.value4,
      value5: body.value5,
      // value6: body.value6,
      // value7: body.value7,
      // value8: body.value8,
      // value9: body.value9,
      // value10: body.value10,
      totalCompensation: body.totalCompensation,
    };

    salarySlabService.addSalarySlab(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Salary slab added successfully."
          : result === "already"
          ? "Salary slab name already exists."
          : result === "false"
          ? "Error while adding salary slab."
          : "Error while adding salary slab.",
        result,
        result === "true" ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateSalarySlab = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      slabName: body.slabName,
      basicSalary: body.basicSalary,
      pfDeduction: body.pfDeduction,
      esiDeduction: body.esiDeduction,
      houseRentAllowance: body.houseRentAllowance,
      medicalAllowance: body.medicalAllowance,
      travelAllowance: body.travelAllowance,
      foodReimbursement: body.foodReimbursement,
      specialAllowance: body.specialAllowance,
      grossCompensation: body.grossCompensation,
      value1: body.value1,
      value2: body.value2,
      value3: body.value3,
      value4: body.value4,
      value5: body.value5,
      totalCompensation: body.totalCompensation,
    };

    salarySlabService.updateSalarySlab(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Salary slab updated successfully."
          : result === "already"
          ? "Salary slab name already exists."
          : result === "false"
          ? "Error while updating salary slab."
          : "Error while updating salary slab.",
        result,
        result === "true" ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const fetchSalarySlabLists = async (req: Request, res: Response) => {
  try {
    salarySlabService.fetchSalarySlabLists(
      req.query.userId,
      req.query.slabName,
      (result: any) => {
        new HttpResponse(
          res,
          result.length >= 1
            ? "Salary slab fetched successfully."
            : result.length === 0
            ? "Not found."
            : "Error while fetching salary slab.",
          result,
          result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteSalarySlab = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    salarySlabService.deleteSalarySlab(
      req.params.id,
      isDelete,
      (result: any) => {
        new HttpResponse(
          res,
          result ? "Salary slab deleted successfully." : "Failed",
          result,
          result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const fetchEmployeeSalaryDetails = async (
  req: Request,
  res: Response
) => {
  try {
    salarySlabService.fetchEmployeeSalaryDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Employee details fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const filterMonthlyReport = async (req: Request, res: Response) => {
  try {
    salarySlabService.filterMonthlyReport(
      req.query.userId,
      req.query.month,
      req.query.year,
      req.query.department,
      req.query.jobRole,
      req.query.employeeId,
      (result: any) => {
        new HttpResponse(
          res,
          result.length >= 1
            ? "Pay slip report fetched successfully."
            : result.length === 0
            ? "No records found."
            : "Error while fetching pay slip report.",
          result,
          result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

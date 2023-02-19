import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { CompanyService } from "../services/company.service";

export const getCompany = async (req: Request, res: Response) => {
  try {
    const result = await CompanyService.fetch();
    new HttpResponse(
      res,
      "Company fetched successfully",
      result
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const companyId = req.params.companyId;
  try {
    const result = await CompanyService.delete(companyId);
    new HttpResponse(
      res,
      result ? "Company deleted successfully." : "Error while deleting company",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  const body = req.body;
  const companyId = req.params.companyId;

  try {
    const result = await CompanyService.update(companyId, body);
    new HttpResponse(
      res,
      result
        ? "Company updated successfully"
        : "Error while updating the company",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const createCompany = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const data = {
      fullName: body.fullName,
      mobileNumber: body.mobileNumber,
      password: body.password,
      ipAddress: body.ipAddress,
      location: body.location,
      employeeId: body.employeeId,
    };

    const result = await CompanyService.create({
      params: {
        companyName: body.companyName,
        companyAlias: body.companyAlias,
        companyId: Helper.generateUUID(),
      },
      userData: data,
    });
    new HttpResponse(
      res,
      result ? "Company Created Successfully" : "Error while creating company",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

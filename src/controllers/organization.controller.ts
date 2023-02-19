import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { organizationService } from "../services/organization.service";

export const organizationDetails = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      adminName: body.adminName,
      mobileNumber: body.mobileNumber,
      organizationName: body.organizationName,
      designation: body.designation,
      organizationType: body.organizationType,
      officialMobileNumber: body.officialMobileNumber,
      businessWebsite: body.businessWebsite,
      businessPanCardNumber: body.businessPanCardNumber,
      gstNumber: body.gstNumber,
      organizationAddress: body.organizationAddress,
      businessEmail: body.businessEmail,
    };
    organizationService.organizationDetails(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Organization details saved successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getOrganizationDetails = async (req: Request, res: Response) => {
  try {
    organizationService.getOrganizationDetails((result: any) => {
      new HttpResponse(
        res,
        result ? "Organization details fetched successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

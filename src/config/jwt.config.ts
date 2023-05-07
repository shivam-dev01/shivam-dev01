import { Request, Response, NextFunction } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { Environment } from "../constants/Environment";
import { decode, verify, sign } from "jsonwebtoken";
import { UserModel, UserSchema } from "../models/user.model";
import { CompanySchema } from "../models/company.model";
import { dbConnectionMiddleware, setUpDbConnection } from "./dbConnection";

const validateLoginToken = async (token: string) => {
  try {
    const decoded = await verify(token, Environment.JWT_SECRET_TOKEN);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const securityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const unauthorizedResponse = (message?: string) => {
    new HttpResponse(
      res,
      message ? message : "User Unauthorized",
      null,
      401
    ).sendResponse();
  };

  const fetchCompanyId = async (companyAlias: string) => {
    const result = await CompanySchema.findByCompanyAlias(companyAlias);
    return result.companyAlias;
  };

  console.log(req.url);

  if (req.url.includes("/super/company")) {
    req.headers["companyId"] = "master-collection";
    next();
    return;
  }

  if (
    req.url.includes("/auth/login") ||
    req.url.includes("/auth/register") ||
    req.url.includes("/auth/send-otp") ||
    req.url.includes("/auth/verify-otp") ||
    req.url.includes("/auth/reset-password")
  ) {
    if (!req.body["companyAlias"]) {
      unauthorizedResponse("Company Alias is required.");
      return;
    }
    await setUpDbConnection();
    // const companyId = await fetchCompanyId(req.body["companyAlias"]);
    console.log(
      "Company Id in jwt config.ts:------- ",
      req.body["companyAlias"]
    );

    req.headers["companyId"] = req.body["companyAlias"];
    next();
    return;
  }

  let authToken = req.headers.authorization;

  if (!authToken) {
    unauthorizedResponse();
    return;
  }

  if (!authToken.includes("Bearer ")) {
    unauthorizedResponse();
    return;
  }

  authToken = authToken.replace("Bearer ", "");

  let decodedToken = await validateLoginToken(authToken);
  if (!decodedToken) {
    unauthorizedResponse();
    return;
  }

  if ((decodedToken as any).companyId) {
    req.headers["companyId"] = (decodedToken as any).companyId;
    next();
    return;
  }

  if (!req.headers.companyid) {
    unauthorizedResponse("Error while connecting to the database.");
    return;
  }

  decodedToken = decodedToken as UserModel;

  if (decodedToken["id"]) {
    const user = await UserSchema.activeUserById(decodedToken["id"]);
    if (!user) {
      unauthorizedResponse("User is deactivated.");
      return;
    }
  }
  next();
};

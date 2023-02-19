import express from "express";
import { ValidationChain, validationResult } from "express-validator";
import { HttpResponse } from "./HttpResponse";

export class RequestValidation {
  // sequential processing, stops running validations chain if the previous one have failed.
  static validateFunction = (validations: ValidationChain[]) => {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      console.log(errors.array());
      if (errors.isEmpty()) {
        return next();
      }

      new HttpResponse(res, "Bad request", errors.array(), 400).sendResponse();
    };
  };
}

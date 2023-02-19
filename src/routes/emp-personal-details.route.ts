import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { empPersonalDetailsControllers } from "../controllers";

const empPersonalDetailsRouter = express.Router();

// empPersonalDetailsRouter.post(
//   "/employee-personal-details",
//   RequestValidation.validateFunction(
//     requestValidationConfig.empPersonalDetails
//   ),
//   empPersonalDetailsControllers.empPersonalDetails
// );

empPersonalDetailsRouter.put(
  "/employee-update-personal-details/:id",
  RequestValidation.validateFunction(
    requestValidationConfig.empUpdatePersonalDetails
  ),
  empPersonalDetailsControllers.empUpdatePersonalDetails
);

empPersonalDetailsRouter.get(
  "/employee-get-personal-details",
  empPersonalDetailsControllers.empGetPersonalDetails
);

empPersonalDetailsRouter.get(
  "/employee-get-specified-personal-details/:mobileNumber",
  RequestValidation.validateFunction(
    requestValidationConfig.empGetSpecifiedPersonalDetails
  ),
  empPersonalDetailsControllers.empGetSpecifiedPersonalDetails
);

empPersonalDetailsRouter.get(
  "/fetch-employee-profile-details",
  RequestValidation.validateFunction(
    requestValidationConfig.employeeProfileDetails
  ),
  empPersonalDetailsControllers.employeeProfileDetails
);

export default empPersonalDetailsRouter;

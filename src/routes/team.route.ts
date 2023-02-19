import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { teamController } from "../controllers";

const teamRouter = express.Router();

teamRouter.post(
  "/add",
  RequestValidation.validateFunction(requestValidationConfig.createTeam),
  teamController.createTeam
);

teamRouter.put(
  "/update/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateTeam),
  teamController.updateTeam
);

teamRouter.get(
  "/fetch",
  RequestValidation.validateFunction(requestValidationConfig.fetchTeam),
  teamController.fetchTeam
);

teamRouter.delete(
  "/delete/:id",
  RequestValidation.validateFunction(requestValidationConfig.deleteTeam),
  teamController.deleteTeam
);

export default teamRouter;

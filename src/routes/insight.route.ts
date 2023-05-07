import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { insightController } from "../controllers";
import { UserType } from "../models/user.model";

const insightRouter = express.Router();

insightRouter.post(
  "/create-insight",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.createInsight),
  insightController.createInsight
);

insightRouter.put(
  "/update-insight/:id",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.updateInsight),
  insightController.updateInsight
);

insightRouter.delete(
  "/delete-insight/:id",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.deleteInsight),
  insightController.deleteInsight
);

insightRouter.get(
  "/get-insight-details",
  //Helper.protectedRoute([UserType.ADMIN]),
  insightController.getInsight
);

export default insightRouter;

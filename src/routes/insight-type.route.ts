import express from "express";
import { Helper } from "../classes/Helper";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { insightTypeController } from "../controllers";
import { UserType } from "../models/user.model";

const insightTypeRouter = express.Router();

insightTypeRouter.post(
  "/create-insight-type",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.createInsightType),
  insightTypeController.createInsightType
);

insightTypeRouter.put(
  "/update-insight-type/:id",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.updateInsightType),
  insightTypeController.updateInsightType
);

insightTypeRouter.delete(
  "/delete-insight-type/:id",
  //Helper.protectedRoute([UserType.ADMIN]),
  RequestValidation.validateFunction(requestValidationConfig.deleteInsightType),
  insightTypeController.deleteInsightType
);

insightTypeRouter.get(
  "/get-insight-type-details",
  //Helper.protectedRoute([UserType.ADMIN]),
  insightTypeController.getInsightTypeDetails
);

export default insightTypeRouter;

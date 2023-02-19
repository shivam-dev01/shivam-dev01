import { RequestValidation } from "../classes/RequestValidation";
import express from "express";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { ViewController } from "../controllers";
const viewRouter = express.Router();

viewRouter.post(
  "/",
  RequestValidation.validateFunction(requestValidationConfig.createView),
  ViewController.createViews
);

viewRouter.get("/", ViewController.getViews);

viewRouter.delete(
  "/:viewId",
  RequestValidation.validateFunction(requestValidationConfig.deleteView),
  ViewController.deleteViews
);

viewRouter.put(
  "/:viewId",
  RequestValidation.validateFunction(requestValidationConfig.updateView),
  ViewController.updateViews
);

export default viewRouter;

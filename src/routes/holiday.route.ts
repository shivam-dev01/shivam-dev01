import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { holidayController } from "../controllers";
const holidayRouter = express.Router();

holidayRouter.post(
  "/add-holiday",
  // RequestValidation.validateFunction(requestValidationConfig.addHoliday),//need another validation after after taking request payload in array this validation is not working
  holidayController.addHoliday
);

holidayRouter.get(
  "/get-holiday-list",
  RequestValidation.validateFunction(requestValidationConfig.getHolidayList),
  holidayController.getHolidayList
);

holidayRouter.delete(
  "/remove-holiday/:id",
  RequestValidation.validateFunction(requestValidationConfig.removeHoliday),
  holidayController.removeHoliday
);

holidayRouter.put(
  "/update-holiday/:id",
  RequestValidation.validateFunction(requestValidationConfig.updateHoliday),
  holidayController.updateHoliday
);

export default holidayRouter;

import { body } from "express-validator";

export const requestValidationConfig = {
  report: [body("email").isEmail(), body("password").isLength({ min: 6 })],
};

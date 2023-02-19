import { Environment } from "./Enviornment";
import * as bcrypt from "bcrypt";

export class Helper {
  static hashPassword(password) {
    return bcrypt.hash(password, Environment.BCRYPT_SALT);
  }

  static checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}

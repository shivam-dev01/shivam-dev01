import { PaymentType } from "../models/wallet.model";

const crypto = require("crypto");
export class Helper {
  constructor() {}

  static generatePaymentTransactionId(paymentType: PaymentType) {
    return `${paymentType === PaymentType.DEBIT ? "DR" : "CR"}-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;
    //return new Date().getTime().toString();
  }

  static getEncry() {
    const data = "this is data ";
    const key = "key";

    const encrypted = crypto.AES.encrypt(data, key).toString();
    console.log(encrypted, "loggggggggggggggggggg");
  }
}

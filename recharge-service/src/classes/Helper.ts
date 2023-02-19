import { RechargeStatus, ReportSchema } from "../models";
import { RechargeService } from "../services/recharge.service";

const crypto = require("crypto");
const cron = require("node-cron");
export class Helper {
  constructor() {}

  static dropdownValueConversion(
    array: any[],
    value: string,
    displayValue: string
  ) {
    return array.map((each) => {
      return { value: each[value], displayValue: each[displayValue] };
    });
  }

  static generateRechargeTransactionId() {
    return `RC-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    //return new Date().getTime().toString();
  }

  static getUserId(req: any) {
    return req.body.user.id;
  }

  static convertToFormData(data: any) {
    return Object.keys(data).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(data[c])}`,
      ""
    );
  }
  static async syncRechargeStatus() {
    const result = await ReportSchema.find({ status: RechargeStatus.PENDING });
    result.map((each) => {
      RechargeService.checkRechargeStatus(
        { transactionNumber: each.transactionNumber },
        () => {
          console.log("Pending recharge status found.", each);
        },
        each
      );
    });
  }

  static runCronJobs() {
    // syncing recharge status
    cron.schedule("*/30 * * * *", () => {
      this.syncRechargeStatus();
      console.log("cron jobs are running.");
    });
  }
}

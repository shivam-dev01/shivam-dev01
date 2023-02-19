import { ReportSchema } from "../models";

export class RechargeService {
  constructor() {}

  static async fetchReport(userId: string) {
    const users = await ReportSchema.find({});
    return users;
  }
}

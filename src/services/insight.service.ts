import { Helper } from "../classes/Helper";
import { insightSchema } from "../models/insight.model";
import { jobRoleSchema } from "../models/jobRole.model";

export class insightService {
  constructor() {}

  static async createInsight(
    insightParams: {
      insightName: string;
      insightDescription: string;
      insightTypeId: string;
    },
    callback: Function
  ) {
    try {
      const getExistingInsightName = await insightSchema.find({
        insightName: insightParams.insightName,
        insightDescription: insightParams.insightDescription,
        insightTypeId: insightParams.insightTypeId,
        isDelete: false,
      });

      if (getExistingInsightName && getExistingInsightName.length) {
        callback("exist");
      } else {
        await insightSchema.create(insightParams);
        callback("true");
      }
    } catch (error: any) {
      Helper.throwError(error);
      callback("false");
    }
  }

  static async updateInsight(
    id,
    insightParams: {
      insightName: string;
      insightDescription: string;
      insightTypeId: string;
    },
    callback: Function
  ) {
    try {
      // const isDelete = false;
      const insights = await insightSchema.find({
        insightName: insightParams.insightName,
        insightDescription: insightParams.insightDescription,
        insightTypeId: insightParams.insightTypeId,
        isDelete: false,
      });
      if (insights && insights.length) {
        callback("exist");
      } else {
        await insightSchema.findByIdAndUpdate(id, insightParams, {
          new: true,
        });
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async deleteInsight(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await insightSchema.findByIdAndUpdate(
          id,
          { isDelete },
          {
            new: true,
          }
        );
        callback(true);
      }
    } catch {
      callback(false);
    }
  }

  static async getInsight(callback: Function) {
    try {
      const result = await insightSchema
        .find({ isDelete: false })
        .populate("insightTypeId");
      callback(result);
    } catch {
      callback(false);
    }
  }
}

import { insightTypeSchema } from "../models/insightType.model";

export class insightTypeService {
  constructor() {}

  static async createInsightType(
    createInsightParams: {
      insightType: string;
    },
    callback: Function
  ) {
    try {
      const insightData = await insightTypeSchema.find({
        insightType: createInsightParams.insightType,
        isDelete: false,
      });

      if (insightData && insightData.length) {
        callback("exist");
      } else {
        await insightTypeSchema.create(createInsightParams);
        callback("true");
      }
    } catch {
      callback("false");
    }
  }
  static async updateInsightType(
    id,
    insightTypeParams: { insightType: string },
    callback: Function
  ) {
    try {
      const insightData = await insightTypeSchema.find({
        insightType: insightTypeParams.insightType,
        isDelete: false,
      });
      if (insightData && insightData.length) {
        callback("exist");
      } else {
        await insightTypeSchema.findByIdAndUpdate(id, insightTypeParams, {
          new: true,
        });
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async deleteInsightType(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await insightTypeSchema.findByIdAndUpdate(
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

  static async getInsightTypeDetails(callback: Function) {
    try {
      const result = await insightTypeSchema.find({ isDelete: false });
      callback(result);
    } catch {
      callback(false);
    }
  }
}

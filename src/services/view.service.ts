import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { ViewModel, ViewSchema } from "../models/view.model";

export class ViewService {
  constructor(callback: Function) {}
  static async create(params: ViewModel) {
    try {
      let result = await ViewSchema.create(params);
      return result;
    } catch (error: any) {
      Helper.throwError("Error while creating view", error);
    }
  }

  static async update(viewId: string, params: ViewModel) {
    try {
      let result = await ViewSchema.findByIdAndUpdate(viewId, { ...params });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while updating the view", error);
    }
  }

  static async delete(viewId: string) {
    try {
      let result = await ViewSchema.findByIdAndUpdate(viewId, {
        isDelete: true,
      });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while deleting view", error);
    }
  }

  static async fetch() {
    try {
      let result = await ViewSchema.find({ isDelete: false });
      return result;
    } catch (error: any) {
      Helper.throwError("Error while fetch views", error);
    }
  }
}

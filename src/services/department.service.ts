import { Helper } from "../classes/Helper";
import { departmentSchema } from "../models/department.model";

export class departmentService {
  constructor() {}

  static async addDepartment(
    jobRoleParams: {
      department: string;
    },
    callback: Function
  ) {
    try {
      const department = await departmentSchema.find({
        department: jobRoleParams.department,
        isDelete: false,
      });

      if (department && department.length) {
        callback("exist");
      } else {
        await departmentSchema.create(jobRoleParams);
        callback("true");
      }
    } catch (error: any) {
      Helper.throwError(error);
      callback("false");
    }
  }

  static async updateDepartment(
    id,
    departmentParams: { department: string },
    callback: Function
  ) {
    try {
      // const isDelete = false;
      const department = await departmentSchema.find({
        department: departmentParams.department,
        isDelete: false,
      });
      if (department && department.length) {
        callback("exist");
      } else {
        await departmentSchema.findByIdAndUpdate(id, departmentParams, {
          new: true,
        });
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async deleteDepartment(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await departmentSchema.findByIdAndUpdate(
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

  static async getDepartmentDetails(callback: Function) {
    try {
      const result = await departmentSchema.find({ isDelete: false });
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async adminSaveDepartment(
    params = {
      departmentId: Array,
    },
    callback: Function
  ) {
    try {
      const result = await departmentSchema.create(params);
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async adminUpdateDepartment(
    Id,
    params = {
      departmentId: Array,
    },
    callback: Function
  ) {
    try {
      const result = await departmentSchema.findByIdAndUpdate(Id, params);
      callback(result);
    } catch {
      callback(false);
    }
  }
}

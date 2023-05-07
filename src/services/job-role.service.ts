import { Helper } from "../classes/Helper";
import { jobRoleSchema } from "../models/jobRole.model";

export class jobRoleService {
  constructor() {}

  static async addJobRole(
    jobRoleParams: {
      jobRole: string;
      departmentId: string;
    },
    callback: Function
  ) {
    try {
      const getExistingRole = await jobRoleSchema.find({
        departmentId: jobRoleParams.departmentId,
        jobRole: jobRoleParams.jobRole,
        isDelete: false,
      });

      if (getExistingRole && getExistingRole.length) {
        callback("exist");
      } else {
        await jobRoleSchema.create(jobRoleParams);
        callback("true");
      }
    } catch (error: any) {
      Helper.throwError(error);
      callback("false");
    }
  }

  static async updateJobRole(
    id,
    jobRoleParams: { departmentId: string; jobRole: string },
    callback: Function
  ) {
    try {
      // const isDelete = false;
      const jobRole = await jobRoleSchema.find({
        departmentId: jobRoleParams.departmentId,
        jobRole: jobRoleParams.jobRole,
        isDelete: false,
      });
      if (jobRole && jobRole.length) {
        callback("exist");
      } else {
        await jobRoleSchema.findByIdAndUpdate(id, jobRoleParams, {
          new: true,
        });
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async deleteJobRole(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await jobRoleSchema.findByIdAndUpdate(
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

  static async getJobRole(callback: Function) {
    try {
      const result = await jobRoleSchema
        .find({ isDelete: false })
        .populate("departmentId");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getJobRoleByDep(Id, callback: Function) {
    try {
      const result = await jobRoleSchema
        .find({ departmentId: Id, isDelete: false })
        .populate("departmentId");
      callback(result);
    } catch {
      callback(false);
    }
  }
}

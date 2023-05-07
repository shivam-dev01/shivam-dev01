import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { monthlyReportSchema } from "../models/employees-monthly-report.model";
import { SalarySlabSchema } from "../models/salary-slab.model";
import { UserSchema } from "../models/user.model";

export class salarySlabService {
  constructor() {}

  static async addSalarySlab(
    params: {
      slabName: string;
      basicSalary: string;
      pfDeduction: string;
      esiDeduction: string;
      houseRentAllowance: string;
      medicalAllowance: string;
      travelAllowance: string;
      foodReimbursement: string;
      specialAllowance: string;
      grossCompensation: string;
      value1: number;
      value2: number;
      value3: number;
      value4: number;
      value5: number;
      // value6: number;
      // value7: number;
      // value8: number;
      // value9: number;
      // value10: number;
      totalCompensation: number;
    },
    callback: Function
  ) {
    try {
      const result = await SalarySlabSchema.find({
        isDelete: false,
        slabName: params.slabName,
      });

      if (result && result.length) {
        callback("already");
      } else {
        await SalarySlabSchema.create(params);
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async updateSalarySlab(
    ID,
    params: {
      slabName: string;
      basicSalary: string;
      esiDeduction: string;
      houseRentAllowance: string;
      medicalAllowance: string;
      travelAllowance: string;
      foodReimbursement: string;
      specialAllowance: string;
      grossCompensation: string;
      value1: number;
      value2: number;
      value3: number;
      value4: number;
      value5: number;
      pfDeduction: string;
      totalCompensation: number;
    },
    callback: Function
  ) {
    try {
      const result = await SalarySlabSchema.find({
        isDelete: false,
        slabName: params.slabName,
      });
      if (!result.length) {
        await SalarySlabSchema.findByIdAndUpdate(ID, params);
        callback("true");
        return;
      }
      if (result[0].id === ID) {
        await SalarySlabSchema.findByIdAndUpdate(ID, params);
        callback("true");
        return;
      } else {
        callback("already");
        return;
      }
    } catch {
      callback("false");
    }
  }

  static async fetchSalarySlabLists(UserId, SlabName, callback: Function) {
    try {
      if (!UserId && !SlabName) {
        const result = await SalarySlabSchema.find({ isDelete: false });
        callback(result);
        return;
      }
      if (SlabName && !UserId) {
        const result = await SalarySlabSchema.find({
          isDelete: false,
          slabName: SlabName,
        });
        callback(result);
        return;
      }
      if (!SlabName && UserId) {
        const result = await monthlyReportSchema.find({
          isDelete: false,
          userId: UserId,
        });
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }

  static async deleteSalarySlab(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await SalarySlabSchema.findByIdAndUpdate(
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

  static async fetchEmployeeSalaryDetails(callback: Function) {
    try {
      const result = await monthlyReportSchema.aggregate([
        {
          $lookup: {
            from: IDatabaseSchema.USERS,
            localField: "userId",
            foreignField: "_id",
            as: "data",
          },
        },
      ]);
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async filterMonthlyReport(
    UserId,
    Month,
    Year,
    Department,
    JobRole,
    EmployeeId,
    callback: Function
  ) {
    try {
      if (
        !Month &&
        !Year &&
        !Department &&
        !JobRole &&
        !EmployeeId &&
        !UserId
      ) {
        const result = await monthlyReportSchema.find({});
        callback(result);
        return;
      }
      if (!Month && !Year && !Department && !JobRole && !EmployeeId && UserId) {
        const result = await monthlyReportSchema.find({ userId: UserId });
        callback(result);
        return;
      }
      if (Year && !UserId && !Month && !Department && !JobRole && !EmployeeId) {
        const result = await monthlyReportSchema.find({
          month: { $regex: ".*" + Year + ".*", $options: "i" },
        });
        callback(result);
        return;
      }

      if (Year && Month && !UserId && !Department && !JobRole && !EmployeeId) {
        const result = await monthlyReportSchema.find({
          month: { $regex: ".*" + `${Year}-${Month}` + ".*", $options: "i" },
        });
        callback(result);
        return;
      }

      if (Year && UserId && !Month && !Department && !JobRole && !EmployeeId) {
        const result = await monthlyReportSchema.find({
          userId: UserId,
          month: { $regex: ".*" + Year + ".*", $options: "i" },
        });
        callback(result);
        return;
      }

      if (Year && Month && UserId && !Department && !JobRole && !EmployeeId) {
        const result = await monthlyReportSchema.find({
          userId: UserId,
          month: { $regex: ".*" + `${Year}-${Month}` + ".*", $options: "i" },
        });
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }
}

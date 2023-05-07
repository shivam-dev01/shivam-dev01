import moment, { months } from "moment";
import { Date } from "mongoose";
import {
  configurationSchema,
  ConfigurationType,
  ShiftType,
  WeekOffDays,
} from "../models/connfiguration.model";
import { HolidaySchema } from "../models/holiday.model";
import { LeaveApprovalState, LeaveSchema } from "../models/leave.model";
import { PaidUnpaidLeaveSchema } from "../models/paid-unpaid-leaves.model";
import cron from "node-cron";
import {
  ApprovedLeaveSchema,
  LeaveType,
} from "../models/approved-leaves.model";

export class leaveService {
  constructor() {}

  static async applyLeave(
    params: {
      userId: string;
      fromDate: string;
      toDate: string;
      subject: String;
      description: string;
    },
    callback: Function
  ) {
    try {
      let date1 = moment(params.fromDate, "DD-MM-YYYY");
      let date2 = moment(params.toDate, "DD-MM-YYYY");
      const days = date2.diff(date1, "days");
      // const firstDayOfMonth = moment().startOf("month").format("YYYY-MM");
      // const data = await PaidUnpaidLeaveSchema.find({
      //   userId: params.userId,
      // });

      // cron.schedule("*/10 * * * * *", () => {
      //   console.log("cron nob is running.");
      // });

      await LeaveSchema.create({
        userId: params.userId,
        fromDate: params.fromDate,
        toDate: params.toDate,
        subject: params.subject,
        description: params.description,
        noOfDays: days,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async leaveRequestList(UserId, page, limit, callback: Function) {
    try {
      if (UserId) {
        await LeaveSchema.find({
          userId: UserId,
        }).populate("userId");
        // callback(result);
        // return;
      }
      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await LeaveSchema.find({ userId: UserId })
        .skip(skip)
        .limit(limit)
        .populate("userId");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async adminLeaveRequestList(page, limit, callback: Function) {
    try {
      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await LeaveSchema.find({
        leaveApprovalState: { $ne: LeaveApprovalState.CANCELED },
      })
        .populate("userId")
        .skip(skip)
        .limit(limit);
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async updateLeave(
    Id,
    params: { leaveApprovalState: string; remark: string },
    callback: Function
  ) {
    try {
      if (
        (params.leaveApprovalState === LeaveApprovalState.REJECTED &&
          !params.remark) ||
        (params.leaveApprovalState === LeaveApprovalState.REJECTED &&
          !params.remark.length)
      ) {
        callback("remarks");
        return;
      }
      const findLeaveData = await LeaveSchema.findByIdAndUpdate(Id, params);
      const getFromDate = findLeaveData.fromDate.slice(3, 10);
      const fromDate = findLeaveData.fromDate.split("-");
      const revFromDate = fromDate.reverse();
      const joinFromDate = revFromDate.join("-");
      const toDate = findLeaveData.toDate.split("-");
      const revToDate = toDate.reverse();
      const joinToDate = revToDate.join("-");

      if (Id && params.leaveApprovalState === LeaveApprovalState.APPROVED) {
        const result = await ApprovedLeaveSchema.find({
          userId: findLeaveData.userId,
          $or: [{ date: { $regex: ".*" + getFromDate + ".*", $options: "i" } }],
        }).populate("userId");
        if (result && result.length) {
          var getDaysBetweenDates = function (startDate, endDate) {
            var now = startDate.clone(),
              dates = [];
            while (now.isSameOrBefore(endDate)) {
              dates.push({
                date: now.format("DD-MM-YYYY"),
                userId: findLeaveData.userId,
                leaveType: LeaveType.UNPAID,
                leaveId: findLeaveData._id,
                settlementRequest: false,
              });
              now.add(1, "days");
            }
            return dates;
          };
          var startDate = moment(joinFromDate);
          var endDate = moment(joinToDate);
          var dateList = getDaysBetweenDates(startDate, endDate);
          await ApprovedLeaveSchema.insertMany(dateList);
        } else {
          var getDaysBetweenDates = function (startDate, endDate) {
            var now = startDate.clone(),
              dates = [];
            while (now.isSameOrBefore(endDate)) {
              dates.push({
                date: now.format("DD-MM-YYYY"),
                userId: findLeaveData.userId,
                leaveType:
                  dates.length === 0 ? LeaveType.PAID : LeaveType.UNPAID,
                leaveId: findLeaveData._id,
                settlementRequest: false,
              });
              now.add(1, "days");
            }
            return dates;
          };
          var startDate = moment(joinFromDate);
          var endDate = moment(joinToDate);
          var dateList = getDaysBetweenDates(startDate, endDate);
          await ApprovedLeaveSchema.insertMany(dateList);
        }
      }
      callback("true");
    } catch {
      callback("false");
    }
  }

  static async adminGetSeparateLeaveRequestList(Id, callback: Function) {
    try {
      const result = await LeaveSchema.find({ _id: Id }).populate("userId");
      callback(result);
    } catch {
      callback(false);
    }
  }
  static async leaveSearch(Text, callback: Function) {
    try {
      // var regex = new RegExp(Text, "i");
      if (!Text) {
        const result = await LeaveSchema.find({}).populate("userId");
        callback(result);
      } else {
        const result = await LeaveSchema.find({
          $or: [
            { fromDate: { $regex: ".*" + Text + ".*", $options: "i" } },
            { toDate: { $regex: ".*" + Text + ".*", $options: "i" } },
            { subject: { $regex: ".*" + Text + ".*", $options: "i" } },
            { description: { $regex: ".*" + Text + ".*", $options: "i" } },
            {
              leaveApprovalState: { $regex: ".*" + Text + ".*", $options: "i" },
            },
          ],
        }).populate("userId");
        callback(result);
      }
    } catch {
      callback(false);
    }
  }
  static async employeeLeaveSearch(UserId, Text, callback: Function) {
    try {
      if (!Text && UserId) {
        const result = await LeaveSchema.find({ userId: UserId }).populate(
          "userId"
        );
        callback(result);
      } else {
        const result = await LeaveSchema.find({
          userId: UserId,
          $or: [
            { fromDate: { $regex: ".*" + Text + ".*", $options: "i" } },
            { toDate: { $regex: ".*" + Text + ".*", $options: "i" } },
            { subject: { $regex: ".*" + Text + ".*", $options: "i" } },
            { description: { $regex: ".*" + Text + ".*", $options: "i" } },
            {
              leaveApprovalState: { $regex: ".*" + Text + ".*", $options: "i" },
            },
          ],
        }).populate("userId");
        callback(result);
      }
    } catch {
      callback(false);
    }
  }

  static async filterLeaveRequests(UserId, Status, callback: Function) {
    try {
      if (!UserId && !Status) {
        const result = await LeaveSchema.find({ isDelete: false }).populate(
          "userId"
        );
        callback(result);
        return;
      }

      if (UserId && !Status) {
        const result = await LeaveSchema.find({
          isDelete: false,
          userId: UserId,
        }).populate("userId");
        callback(result);
        return;
      }

      if (UserId && Status) {
        const result = await LeaveSchema.find({
          isDelete: false,
          userId: UserId,
          leaveApprovalState: Status,
        }).populate("userId");
        callback(result);
        return;
      }
      if (!UserId && Status) {
        const result = await LeaveSchema.find({
          isDelete: false,
          leaveApprovalState: Status,
        }).populate("userId");
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }
}

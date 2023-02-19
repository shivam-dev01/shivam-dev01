import { UserSchema, UserType } from "../models/user.model";
import { Helper } from "../classes/Helper";
import { configurationSchema, ShiftType } from "../models/connfiguration.model";
import { loginInfoSchema } from "../models/login-info.model";
import { Messages } from "../constants/Messages";
import {
  AttendanceModel,
  AttendanceSchema,
  AttendanceType,
} from "../models/attendance.model";
import {
  ApprovalState,
  empPersonalDetailsSchema,
} from "../models/empPersonalDetails.model";
import moment from "moment";
import { PaidUnpaidLeaveSchema } from "../models/paid-unpaid-leaves.model";
import { HolidaySchema } from "../models/holiday.model";
import mongoose from "mongoose";
import {
  ApprovedLeaveSchema,
  LeaveType,
} from "../models/approved-leaves.model";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import {
  monthlyReportSchema,
  PaymentStatus,
} from "../models/employees-monthly-report.model";
import { Status } from "../models/expense-model";
import { SalarySlabSchema } from "../models/salary-slab.model";

export class userServices {
  constructor() {}

  //-------------------ADMIN-EMPLOYYEE-DETAIL-------------------

  static async getNewEmployeeId(): Promise<string> {
    const empId1 = await UserSchema.find({})
      .sort({ _id: -1 })
      .limit(1)
      .select(" -_id employeeId");
    const obj1 = String(empId1);

    let employeeId2 = obj1.substring(15, 21);
    let abc = employeeId2.split("").slice(-4).map(Number);
    var toNum1 = parseInt(abc.join("")) + 1;

    if (toNum1.toString().length <= 1) {
      var eid = String(obj1.substring(15, 17)) + "000" + toNum1;
    } else if (toNum1.toString().length == 2) {
      var eid = String(obj1.substring(15, 17)) + "00" + toNum1;
    } else if (toNum1.toString().length == 3) {
      var eid = String(obj1.substring(15, 17)) + "0" + toNum1;
    } else {
      var eid = String(obj1.substring(15, 17)) + toNum1;
    }
    return eid;
  }
  static async createEmployeeDetail(
    employeeParams: {
      fullName: string;
      emailId: string;
      employeeId: String;
      department: string;
      selectDocumentType: string;
      documentsNumber: string;
      mobileNumber: Number;
      aadhaarNumber: string;
      jobRole: string;
      userType: string;
      password: string;
      documents: string;
      profileUpdate: boolean;
      profileVerificationState: boolean;
    },
    callback: Function
  ) {
    try {
      const configData = await UserSchema.findOne({});
      if (configData.employeeId === null) {
        callback("config");
        return;
      }
      const empId = await this.getNewEmployeeId();
      if (employeeParams.employeeId != empId) {
        callback("idExists");
        return;
      }
      const findCompanyName = await UserSchema.find({
        userType: UserType.ROOT,
      });
      await UserSchema.create({
        fullName: employeeParams.fullName,
        mobileNumber: employeeParams.mobileNumber,
        password: "123456",
        userType: UserType.EMPLOYEE,
        organizationName: findCompanyName[0].organizationName,
        department: employeeParams.department,
        emailId: employeeParams.emailId,
        selectDocumentType: employeeParams.selectDocumentType,
        documentsNumber: employeeParams.documentsNumber,
        aadhaarNumber: employeeParams.aadhaarNumber,
        jobRole: employeeParams.jobRole,
        employeeId: empId,
        documents: employeeParams.documents,
      });
      await empPersonalDetailsSchema.create({
        fullName: employeeParams.fullName,
        mobileNumber: employeeParams.mobileNumber,
        userType: UserType.EMPLOYEE,
        organizationName: findCompanyName[0].organizationName,
        department: employeeParams.department,
        emailId: employeeParams.emailId,
        selectDocumentType: employeeParams.selectDocumentType,
        documentsNumber: employeeParams.documentsNumber,
        aadhaarNumber: employeeParams.aadhaarNumber,
        jobRole: employeeParams.jobRole,
        employeeId: empId,
        documents: employeeParams.documents,
      });
      callback("true");
    } catch {
      callback("false");
    }
  }

  static async updateEmployeeDetails(
    Id,
    employeeParams: {
      fullName: String;
      emailId: string;
      department: string;
      selectDocumentType: string;
      mobileNumber: Number;
      aadhaarNumber: string;
      jobRole: string;
      documents: string;
      salarySlab: string;
    },
    callback: Function
  ) {
    try {
      if (!employeeParams.salarySlab) {
        await UserSchema.findByIdAndUpdate(Id, employeeParams);
        callback("true");
        return;
      }
      const salarySlab = await SalarySlabSchema.find({
        _id: employeeParams.salarySlab,
        isDelete: false,
      });
      if (!salarySlab.length) {
        callback("not");
        return;
      }
      await UserSchema.findByIdAndUpdate(Id, employeeParams);
      callback("salary");
    } catch {
      callback("false");
    }
  }

  static async getAllEmployeeDetails(callback: Function) {
    try {
      const result = await UserSchema.find({ userType: UserType.EMPLOYEE });

      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getSpecificEmployeeDetails(userId, callback: Function) {
    try {
      const result = await UserSchema.findById({ _id: userId });

      callback([result]);
    } catch {
      callback(false);
    }
  }
  static async loginInfo(
    loginInfoParams: {
      fullName: string;
      mobileNumber: number;
      employeeId: string;
      loginInTime: string;
      logoutTime: string;
      ipAddress: string;
      location: string;
      deviceId: string;
      // activeHours: string;
    },
    callback: Function
  ) {
    try {
      const data = await UserSchema.find({
        fullName: loginInfoParams.fullName,
        mobileNumber: loginInfoParams.mobileNumber,
      });
      // var startTime = moment(loginInfoParams.loginInTime, "hh:mm:ss a");
      // var endTime = moment(loginInfoParams.logoutTime, "hh:mm:ss a");

      // var getLoginHour = moment
      //   .utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss")))
      //   .format("HH:mm:ss");
      // loginInfoParams.activeHours = getLoginHour;
      if (data && data.length) {
        await loginInfoSchema.create(loginInfoParams);
        callback(true);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async fetchUsers(userId?: string, bulkFetchUserIds?: string[]) {
    try {
      if (userId) {
        const result = await UserSchema.findById(userId);
        return result.toObject();
      } else if (bulkFetchUserIds && bulkFetchUserIds.length) {
        const result = await UserSchema.find({
          _id: {
            $in: bulkFetchUserIds,
          },
        });
        return result.map((each) => each.toObject());
      }
      {
        const result = await UserSchema.find({
          userRole: { $ne: UserType.ADMIN },
          id: userId,
          isDelete: false,
        }).sort({ createdAt: -1 });
        return result.map((each) => each.toObject());
      }
    } catch (error: any) {
      Helper.throwError("Error while fetching user");
    }
  }

  static async userStatus(
    Id,
    getMobile,
    statusParams: {
      approvalState: string;
      remark: string;
    },
    callback: Function
  ) {
    try {
      const userTableDetails = await UserSchema.find({
        mobileNumber: getMobile,
      });
      const empData = await empPersonalDetailsSchema.find({ _id: Id });
      const getId = userTableDetails[0].id;
      if (
        statusParams.approvalState === ApprovalState.APPROVED &&
        empData &&
        empData.length
      ) {
        await empPersonalDetailsSchema.findByIdAndUpdate(Id, {
          approvalState: statusParams.approvalState as ApprovalState,
        });
        await UserSchema.findByIdAndUpdate(getId, {
          profileVerificationState: true,
        });
        await UserSchema.findByIdAndUpdate(getId, {
          approvalState: statusParams.approvalState as ApprovalState,
        });
        callback(ApprovalState.APPROVED);
      } else if (
        statusParams.approvalState === ApprovalState.REJECTED &&
        statusParams.remark &&
        statusParams.remark.length &&
        empData &&
        empData.length
      ) {
        await empPersonalDetailsSchema.findByIdAndUpdate(Id, {
          approvalState: statusParams.approvalState as ApprovalState,
          remark: statusParams.remark,
        });
        await UserSchema.findByIdAndUpdate(getId, {
          approvalState: statusParams.approvalState as ApprovalState,
          remark: statusParams.remark,
        });
        callback(ApprovalState.REJECTED);
      } else {
        callback("false");
      }
    } catch {
      callback("false");
    }
  }
  static async employeeStatus(
    Id,
    params: {
      status: Boolean;
    },
    callback: Function
  ) {
    try {
      const userData = await empPersonalDetailsSchema.find({
        _id: Id,
        userType: UserType.EMPLOYEE,
      });
      if (userData && userData.length && params.status === true) {
        await empPersonalDetailsSchema.findByIdAndUpdate(Id, {
          isActive: params.status,
        });
        callback("activate");
      } else if (userData && userData.length && params.status === false) {
        await empPersonalDetailsSchema.findByIdAndUpdate(Id, {
          isActive: params.status,
        });
        callback("deactivate");
      } else {
        callback("false");
      }
    } catch {
      callback("false");
    }
  }

  static async generateEmployeeId(callback: Function) {
    try {
      const configData = await UserSchema.findOne({});
      if (configData.employeeId === null) {
        callback("config");
        return;
      }
      const empId2 = await this.getNewEmployeeId();
      console.log(empId2);
      callback(empId2);
    } catch {
      callback("false");
    }
  }

  static async lastGeneratedEmpId(callback: Function) {
    try {
      const configData = await UserSchema.findOne({});
      if (configData.employeeId === null) {
        callback("config");
        return;
      } else {
        const result = await UserSchema.find({}).limit(1).sort({ _id: -1 });
        const data = result[0].employeeId;
        callback(data);
      }
    } catch {
      callback("false");
    }
  }

  static async markAttendance(
    params: {
      userId: string;
      workReport: string;
      attendanceType: string;
      checkOutTime: string;
      checkInTime: string;
      date: string;
      todaysWork: string;
    },
    callback: Function
  ) {
    try {
      const crDate = moment().format("DD-MM-YYYY");
      const holidayData = await HolidaySchema.find({
        date: { $in: crDate },
        name: { $ne: "WO" },
      });
      const leaveData = await ApprovedLeaveSchema.find({
        date: { $in: crDate },
      });
      if (leaveData.length) {
        callback("leave");
        return;
      }
      if (holidayData.length) {
        callback("holiday");
        return;
      }

      const currentTime = moment().format();
      const gmtCurrentTime = moment(currentTime).utc().format();
      const gmtCurrentTimeHourMin = moment(gmtCurrentTime).format("HH:mm");
      const findShiftType = await UserSchema.find({ _id: params.userId });
      const findConfigureDayShiftTiming = await configurationSchema.find({
        shiftType: findShiftType[0].assignedShift,
      });
      const lastDayShiftAttendance = await AttendanceSchema.find({
        userId: params.userId,
      })
        .sort({ createdAt: -1 })
        .select(["createdAt", "checkOutTime", "workReport", "checkInTime"])
        .limit(1);

      const dayInStartGMTTime = moment(
        findConfigureDayShiftTiming[0].officeInStartTime
      )
        .utc()
        .format();
      const inStartHourMin = moment(dayInStartGMTTime).format("HH:mm");
      const dayInEndGMTTime = moment(
        findConfigureDayShiftTiming[0].officeInEndTime
      )
        .utc()
        .format();
      const inEndHourMin = moment(dayInEndGMTTime).format("HH:mm");

      const dayOutStartGMTTime = moment(
        findConfigureDayShiftTiming[0].officeOutStartTime
      )
        .utc()
        .format();
      const outStartHourMin = moment(dayOutStartGMTTime).format("HH:mm");

      const dayOutEndGMTTime = moment(
        findConfigureDayShiftTiming[0].officeOutEndTime
      )
        .utc()
        .format();
      const outEndHourMin = moment(dayOutEndGMTTime).format("HH:mm");

      console.log(
        gmtCurrentTimeHourMin,
        "should be greater than",
        inStartHourMin,
        "less than",
        inEndHourMin
      );
      console.log(
        gmtCurrentTimeHourMin,
        "should be greater than",
        outStartHourMin,
        "less than",
        outEndHourMin
      );
      const currentDay = moment(currentTime).format("dddd").toUpperCase();

      const nextDay = moment()
        .add(1, "days")
        .format("dddd")
        .toLocaleUpperCase();
      if (
        (params.attendanceType === AttendanceType.IN &&
          currentDay === findConfigureDayShiftTiming[0].weekOff[0]) ||
        (params.attendanceType === AttendanceType.IN &&
          currentDay === findConfigureDayShiftTiming[0].weekOff[1]) ||
        (params.attendanceType === AttendanceType.OUT &&
          currentDay === findConfigureDayShiftTiming[0].weekOff[1])
      ) {
        callback("weekOff");
        return;
      }

      if (lastDayShiftAttendance && lastDayShiftAttendance.length) {
        const lastDayShiftAttendanceData = lastDayShiftAttendance[0];
        const todayDate = moment();
        if (
          params.attendanceType === AttendanceType.IN &&
          todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day")
        ) {
          callback("already");
          return;
        } else if (
          params.attendanceType === AttendanceType.OUT &&
          gmtCurrentTimeHourMin >= outStartHourMin &&
          gmtCurrentTimeHourMin <= outEndHourMin &&
          params.workReport.length &&
          !todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day")
        ) {
          params.checkOutTime = moment().format();
          params.date = moment().format("DD-MM-YYYY");
          await AttendanceSchema.create({
            userId: params.userId,
            workReport: params.workReport,
            attendanceType: params.attendanceType,
            checkInTime: null,
            checkOutTime: moment().format(),
            workingHour: "04:00",
            date: moment().format("DD-MM-YYYY"),
          });
          if (!lastDayShiftAttendance.length) {
            await UserSchema.findByIdAndUpdate(params.userId, {
              dateOfJoining: moment().format(),
            });
          }
          callback("true");
        } else if (
          params.attendanceType === AttendanceType.OUT &&
          params.workReport.length &&
          lastDayShiftAttendanceData.workReport != null &&
          todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day")
        ) {
          callback("reportAlready");
          return;
        } else if (
          gmtCurrentTimeHourMin >= inStartHourMin &&
          gmtCurrentTimeHourMin <= inEndHourMin &&
          params.attendanceType === AttendanceType.IN
        ) {
          params.checkInTime = moment().format();
          params.date = moment().format("DD-MM-YYYY");
          await AttendanceSchema.create({
            userId: params.userId,
            workReport: null,
            attendanceType: params.attendanceType,
            checkInTime: moment().format(),
            checkOutTime: null,
            workingHour: "04:00",
            date: moment().format("DD-MM-YYYY"),
            todaysWork: params.todaysWork,
          });
          if (!lastDayShiftAttendance.length) {
            await UserSchema.findByIdAndUpdate(params.userId, {
              dateOfJoining: moment().format(),
            });
          }
          callback("true");
        } else if (
          gmtCurrentTimeHourMin >= outStartHourMin &&
          gmtCurrentTimeHourMin <= outEndHourMin &&
          lastDayShiftAttendanceData.workReport === null &&
          params.attendanceType === AttendanceType.OUT &&
          params.workReport.length &&
          params.workReport.length
        ) {
          const diffHours = moment(moment().format()).diff(
            moment(lastDayShiftAttendance[0].checkInTime),
            "m"
          );
          const time = Math.floor(diffHours / 60) + ":" + (diffHours % 60);
          await AttendanceSchema.findByIdAndUpdate(
            lastDayShiftAttendance[0]._id,
            {
              workReport: params.workReport,
              checkOutTime: moment().format(),
              attendanceType: params.attendanceType,
              workingHour: time < "8:00" || time === "NaN:NaN" ? "04:00" : time,
            }
          );
          callback("true");
        } else {
          callback("false");
        }
      } else if (
        gmtCurrentTimeHourMin >= inStartHourMin &&
        gmtCurrentTimeHourMin <= inEndHourMin &&
        params.attendanceType === AttendanceType.IN
      ) {
        params.checkInTime = moment().format();
        params.date = moment().format("DD-MM-YYYY");
        await AttendanceSchema.create({
          userId: params.userId,
          workReport: null,
          attendanceType: params.attendanceType,
          checkInTime: moment().format(),
          checkOutTime: null,
          workingHour: "04:00",
          date: moment().format("DD-MM-YYYY"),
          todaysWork: params.todaysWork,
        });
        if (!lastDayShiftAttendance.length) {
          await UserSchema.findByIdAndUpdate(params.userId, {
            dateOfJoining: moment().format(),
          });
        }
        callback("true");
      } else if (
        gmtCurrentTimeHourMin >= outStartHourMin &&
        gmtCurrentTimeHourMin <= outEndHourMin &&
        params.attendanceType === AttendanceType.OUT &&
        params.workReport.length &&
        params.workReport.length
      ) {
        params.checkOutTime = moment().format();
        params.date = moment().format("DD-MM-YYYY");
        await AttendanceSchema.create({
          userId: params.userId,
          workReport: params.workReport,
          attendanceType: params.attendanceType,
          checkInTime: null,
          checkOutTime: moment().format(),
          workingHour: "04:00",
          date: moment().format("DD-MM-YYYY"),
        });
        if (!lastDayShiftAttendance.length) {
          await UserSchema.findByIdAndUpdate(params.userId, {
            dateOfJoining: moment().format(),
          });
        }
        callback("true");
      } else {
        callback("false");
      }
    } catch {
      callback("false");
    }
  }
  static async getAdminProfileDetails(callback: Function) {
    try {
      const result = await UserSchema.find({ userType: UserType.ROOT });
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async updateAdminProfile(
    Id,
    profileParams: {
      gender: string;
      emailId: string;
      aadhaarNumber: string;
      DOB: string;
      panCardNumber: string;
      personalAddress: string;
      alternateMobileNumber: number;
      alternateEmailId: string;
    },
    callback: Function
  ) {
    try {
      const data = await UserSchema.find({ _id: Id });
      if (data && data.length) {
        await UserSchema.findByIdAndUpdate(Id, profileParams);
        callback(true);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async getLastLoginTime(mobile, callback: Function) {
    try {
      const result = await loginInfoSchema
        .find({ mobileNumber: mobile })
        .limit(1)
        .sort({ _id: -1 });
      const data = result[0].loginInTime;
      callback(data);
    } catch (error: any) {
      callback(false);
      Helper.throwError("Error while fetching login time.", error);
    }
  }

  static async assignShift(
    Id,
    params: {
      assignShift: string;
    },
    callback: Function
  ) {
    try {
      await UserSchema.findByIdAndUpdate(Id, {
        assignedShift: params.assignShift,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async getAttendanceReport(UserId, page, limit, callback: Function) {
    try {
      // const result = await AttendanceSchema.find({ userId: UserId }).populate(
      //   "userId"
      // );
      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await AttendanceSchema.find({ userId: UserId })
        .skip(skip)
        .limit(limit)
        .populate("userId");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getSingleReport(Id, callback: Function) {
    try {
      const result = await AttendanceSchema.find({ _id: Id })
        .populate("userId")
        .populate("remarkBy");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getCustomReport(
    Department,
    Date,
    page,
    limit,
    callback: Function
  ) {
    try {
      if (Date && !Department) {
        const result = await AttendanceSchema.find({
          $or: [
            {
              checkInTime: { $regex: ".*" + Date + ".*", $options: "i" },
            },
            {
              checkOutTime: { $regex: ".*" + Date + ".*", $options: "i" },
            },
          ],
        }).populate("userId");
        callback(result);
        return;
      }
      if (Department && !Date) {
        const result = await UserSchema.aggregate([
          {
            $match: { department: Department },
          },
        ]);
        const data = result.map((each: any) => {
          return each._id;
        });
        const result1 = await AttendanceSchema.find({
          userId: { $in: data },
        }).populate("userId");
        console.log(result1);
        callback(result1);
        return;
      }

      if (Department && Date) {
        const result = await UserSchema.aggregate([
          {
            $match: { department: Department },
          },
        ]);
        const data = result.map((each: any) => {
          return each._id;
        });
        const result1 = await AttendanceSchema.find({
          userId: { $in: data },
        }).populate("userId");
        const result2 = await AttendanceSchema.find({
          $or: [
            {
              checkInTime: { $regex: ".*" + Date + ".*", $options: "i" },
            },
            {
              checkOutTime: { $regex: ".*" + Date + ".*", $options: "i" },
            },
          ],
        }).populate("userId");
        // let array = [];
        // array.push(result1);
        // array.push(result2);
        console.log(result1, result2);
        callback(result1, result2);
      }

      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await AttendanceSchema.find({})
        .skip(skip)
        .limit(limit)
        .populate("userId");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getCustomEmployeeList(page, limit, callback: Function) {
    try {
      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await UserSchema.find({ userType: UserType.EMPLOYEE })
        .skip(skip)
        .limit(limit)
        .populate("salarySlab");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async filteredEmployee(
    shift,
    department,
    jobRole,
    callback: Function
  ) {
    try {
      if (!shift && !department && !jobRole) {
        const result = await UserSchema.find({
          userType: UserType.EMPLOYEE,
        });
        callback(result);
      }

      if (shift && department && jobRole) {
        const result = await UserSchema.find({
          assignedShift: shift,
          userType: UserType.EMPLOYEE,
          department: department,
          jobRole: jobRole,
        });
        callback(result);
      }

      if (!shift && department && jobRole) {
        const result = await UserSchema.find({
          userType: UserType.EMPLOYEE,
          department: department,
          jobRole: jobRole,
        });
        callback(result);
      }

      if (shift && !department && !jobRole) {
        const result = await UserSchema.find({
          assignedShift: shift,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
      }
      if (shift && department && !jobRole) {
        const result = await UserSchema.find({
          assignedShift: shift,
          department: department,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
      }
      if (!shift && department && !jobRole) {
        const result = await UserSchema.find({
          department: department,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
      }
      if (!shift && !department && jobRole) {
        const result = await UserSchema.find({
          jobRole: jobRole,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
      }
    } catch {
      callback(false);
    }
  }

  static async attendanceReport(Page, Limit, callback: Function) {
    try {
      const skip = (Page - 1) * 10;
      if (!Page) Page = 1;
      if (!Limit) Limit = 10;
      const result = await AttendanceSchema.find({})
        .skip(skip)
        .limit(Limit)
        .populate("userId")
        .populate("remarkBy");
      callback(result);

      // const processAttendanceData = (data) => {
      //   data.forEach((each: any) => {
      //     each["workingHours"] = null;
      //     const checkOutTime = each.checkOutTime;
      //     const checkInTime = each.checkInTime;
      //     const diffHours = moment(checkOutTime).diff(moment(checkInTime), "m");
      //     const time = Math.floor(diffHours / 60) + ":" + (diffHours % 60);
      //     if (time < "8:00" || time === "NaN:NaN") {
      //       each.workingHours = "HALF-DAY";
      //     } else {
      //       each.workingHours = time;
      //     }
      //   });
      //   return data;
      // };
      // const result = await AttendanceSchema.find({}).populate("userId").lean();
      // const processData = await processAttendanceData(result);
      // const findHoliday = await HolidaySchema.find({});
      // let array = [];
      // for (let i = 0; i < processData.length; i++) {
      //   array.push(processData[i]);
      // }
      // for (let i = 0; i < findHoliday.length; i++) {
      //   array.push(findHoliday[i]);
      // }
      // // const customSort = (a, b) => {
      // //   const dateA = a.createdAt;
      // //   const dateB = b.date;
      // //   if (dateA > dateB) return 1;
      // //   if (dateA < dateB) return -1;
      // //   return 0;
      // // };
      // // callback(array.sort(customSort));
      // callback(array);
    } catch {
      callback(false);
    }
  }
  static async employeeAttendanceReport(
    AttendanceId,
    Page,
    Limit,
    callback: Function
  ) {
    try {
      const skip = (Page - 1) * 10;
      if (!Page) Page = 1;
      if (!Limit) Limit = 10;
      const result = await AttendanceSchema.find({ userId: AttendanceId })
        .skip(skip)
        .limit(Limit)
        .populate("userId")
        .populate("remarkBy");
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async searchEmployee(Text, callback: Function) {
    try {
      if (!Text) {
        const result = await UserSchema.find({});
        callback(result);
      } else {
        const result = await UserSchema.find({
          $or: [
            { fullName: { $regex: ".*" + Text + ".*", $options: "i" } },
            // { mobileNumber: { $regex: ".*" + Text + ".*", $options: "i" } },//deepak sir please locate into it why mobile number not working
            { department: { $regex: ".*" + Text + ".*", $options: "i" } },
            { jobRole: { $regex: ".*" + Text + ".*", $options: "i" } },
            { emailId: { $regex: ".*" + Text + ".*", $options: "i" } },
            { approvalState: { $regex: ".*" + Text + ".*", $options: "i" } },
            { assignedShift: { $regex: ".*" + Text + ".*", $options: "i" } },
            { employeeId: { $regex: ".*" + Text + ".*", $options: "i" } },
          ],
        });
        callback(result);
      }
    } catch {
      callback(false);
    }
  }

  static async searchAttendance(Text, callback: Function) {
    try {
      if (!Text) {
        const result = await AttendanceSchema.find({}).populate("userId");
        callback(result);
      } else {
        // const result = await AttendanceSchema.aggregate([
        //   {
        //     $lookup:{
        //       from:"",
        //       localField:"",
        //       foreignField:"",
        //       as: "userId"
        //     }
        //   }
        // ])
        // const result = await AttendanceSchema.find({
        // $or: [
        //   { workReport: { $regex: ".*" + Text + ".*", $options: "i" } },
        //   { attendanceType: { $regex: ".*" + Text + ".*", $options: "i" } },
        //   { checkoutTime: { $regex: ".*" + Text + ".*", $options: "i" } },
        // { checkInTime: { $regex: ".*" + Text + ".*", $options: "i" } },
        // { createdAt: { $regex: ".*" + Text + ".*", $options: "i" } },
        // ],
        // }).populate("userId");
        const result = await AttendanceSchema.find({
          checkOutTime: `${Text}`,
        }).populate("userId");
        callback(result);
      }
    } catch {
      callback(false);
    }
  }
  static async employeeSearchAttendance(UserId, Text, callback: Function) {
    try {
      if (!Text && UserId) {
        const result = await AttendanceSchema.find({ userId: UserId }).populate(
          "userId"
        );
        callback(result);
      } else {
        const result = await AttendanceSchema.find({
          userId: UserId,
          $or: [
            { workReport: { $regex: ".*" + Text + ".*", $options: "i" } },
            { attendanceType: { $regex: ".*" + Text + ".*", $options: "i" } },
            // { checkoutTime: { $regex: ".*" + Text + ".*", $options: "i" } },
            // { checkInTime: { $regex: ".*" + Text + ".*", $options: "i" } },
            // { createdAt: { $regex: ".*" + Text + ".*", $options: "i" } },
          ],
        }).populate("userId");
        callback(result);
      }
    } catch {
      callback(false);
    }
  }
  static async uploadImage(
    Id,
    param: { profileImage: string },
    callback: Function
  ) {
    try {
      await UserSchema.findByIdAndUpdate(Id, {
        profileImage: param.profileImage,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async adminUploadImage(
    Id,
    param: { profileImage: string },
    callback: Function
  ) {
    try {
      await UserSchema.findByIdAndUpdate(Id, {
        profileImage: param.profileImage,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async monthlyYearlyAttendanceReport(
    UserId,
    month,
    year,
    callback: Function
  ) {
    try {
      if (UserId && !month && !year) {
        const result = await AttendanceSchema.find({
          userId: UserId,
        })
          .populate("userId")
          .populate("remarkBy");
        callback(result);
      }

      if (UserId && !month && year) {
        const result = await AttendanceSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${year}` + ".*",
            $options: "i",
          },
        })
          .populate("userId")
          .populate("remarkBy");
        callback(result);
      }
      if (UserId && month && year) {
        const result = await AttendanceSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${month}-${year}` + ".*",
            $options: "i",
          },
        })
          .populate("userId")
          .populate("remarkBy");
        callback(result);
      }
    } catch {
      callback(false);
    }
  }

  static async monthlyYearlyCompleteReport(
    UserId,
    Month,
    Year,
    callback: Function
  ) {
    try {
      if (UserId && Month && Year) {
        const approvedLeaveData = await ApprovedLeaveSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${Month}-${Year}` + ".*",
            $options: "i",
          },
        }).populate("userId");

        const attendanceData = await AttendanceSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${Month}-${Year}` + ".*",
            $options: "i",
          },
        })
          .populate("userId")
          .populate("remarkBy");
        const holidayData = await HolidaySchema.find({
          date: { $regex: ".*" + `${Month}-${Year}` + ".*", $options: "i" },
        });
        let array = [];
        for (let i = 0; i < approvedLeaveData.length; i++) {
          array.push(approvedLeaveData[i]);
        }

        for (let i = 0; i < attendanceData.length; i++) {
          array.push(attendanceData[i]);
        }

        for (let i = 0; i < holidayData.length; i++) {
          array.push(holidayData[i]);
        }
        array.sort((a, b) => {
          const splitA = a.date.split("-").reverse().join("-");
          const splitB = b.date.split("-").reverse().join("-");
          let date1: any = new Date(splitA);
          let date2: any = new Date(splitB);
          const date = date1 - date2;
          return date;
        });

        callback(array);
      } else if (UserId && Year && !Month) {
        const approvedLeaveData = await ApprovedLeaveSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${Year}` + ".*",
            $options: "i",
          },
        }).populate("userId");
        const attendanceData = await AttendanceSchema.find({
          userId: UserId,
          date: {
            $regex: ".*" + `${Year}` + ".*",
            $options: "i",
          },
        })
          .populate("userId")
          .populate("remarkBy");
        const holidayData = await HolidaySchema.find({
          date: { $regex: ".*" + `${Year}` + ".*", $options: "i" },
        });
        let array = [];
        for (let i = 0; i < approvedLeaveData.length; i++) {
          array.push(approvedLeaveData[i]);
        }

        for (let i = 0; i < attendanceData.length; i++) {
          array.push(attendanceData[i]);
        }

        for (let i = 0; i < holidayData.length; i++) {
          array.push(holidayData[i]);
        }
        array.sort((a, b) => {
          const splitA = a.date.split("-").reverse().join("-");
          const splitB = b.date.split("-").reverse().join("-");
          let date1: any = new Date(splitA);
          let date2: any = new Date(splitB);
          const date = date1 - date2;
          return date;
        });

        callback(array);
      } else if (UserId && !Year && !Month) {
        const approvedLeaveData = await ApprovedLeaveSchema.find({
          userId: UserId,
        }).populate("userId");
        const attendanceData = await AttendanceSchema.find({
          userId: UserId,
        }).populate("userId");
        const holidayData = await HolidaySchema.find({});
        let array = [];
        for (let i = 0; i < approvedLeaveData.length; i++) {
          array.push(approvedLeaveData[i]);
        }

        for (let i = 0; i < attendanceData.length; i++) {
          array.push(attendanceData[i]);
        }

        for (let i = 0; i < holidayData.length; i++) {
          array.push(holidayData[i]);
        }
        array.sort((a, b) => {
          const splitA = a.date.split("-").reverse().join("-");
          const splitB = b.date.split("-").reverse().join("-");
          let date1: any = new Date(splitA);
          let date2: any = new Date(splitB);
          const date = date1 - date2;
          return date;
        });
        callback(array);
      }
    } catch {
      callback(false);
    }
  }

  static async observerRemark(
    ID,
    params: {
      remarkBy: string;
      observerRemark: string;
    },
    callback: Function
  ) {
    try {
      const result = await AttendanceSchema.find({ _id: ID });
      if (result && result[0].workReport && result[0].workReport.length) {
        await AttendanceSchema.findByIdAndUpdate(ID, {
          remarkBy: params.remarkBy,
          observerRemark: params.observerRemark,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async removeObserverRemark(ID, callback: Function) {
    try {
      const result = await AttendanceSchema.find({ _id: ID });
      if (
        result &&
        result[0].observerRemark &&
        result[0].observerRemark.length
      ) {
        await AttendanceSchema.findByIdAndUpdate(ID, {
          observerRemark: null,
        });
        callback(true);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async generateMonthlyReport(
    params: { userId: string; monthlyReport: string; month: string },
    callback: Function
  ) {
    try {
      const splitMonths = params.month.split("-");
      const reverse = splitMonths.reverse();
      const reverseMonth = reverse.join("-");

      const holidayData = await HolidaySchema.find({
        date: {
          $regex: ".*" + `${reverseMonth}` + ".*",
          $options: "i",
        },
      });

      const userData = await UserSchema.find({ _id: params.userId });
      const salaryName = userData[0].salarySlab;
      if (salaryName === null) {
        // NEED TO LOOK INTO THIS LINE
        callback("slab");
        return;
      }

      if (!holidayData.length) {
        callback("holiday");
        return;
      }

      const result = await monthlyReportSchema.find({
        userId: params.userId,
        month: params.month,
      });
      if (result && result.length) {
        callback("generated");
        return;
      } else {
        const paidLeaveData = await ApprovedLeaveSchema.find({
          userId: params.userId,
          date: {
            $regex: ".*" + `${reverseMonth}` + ".*",
            $options: "i",
          },
          leaveType: LeaveType.PAID,
        });
        const unpaidLeaveData = await ApprovedLeaveSchema.find({
          userId: params.userId,
          date: {
            $regex: ".*" + `${reverseMonth}` + ".*",
            $options: "i",
          },
          leaveType: LeaveType.UNPAID,
        });

        const findAttendanceData = await AttendanceSchema.find({
          userId: params.userId,
          date: {
            $regex: ".*" + `${reverseMonth}` + ".*",
            $options: "i",
          },
        });

        const findWeekOffInMonth = await HolidaySchema.find({
          date: {
            $regex: ".*" + `${reverseMonth}` + ".*",
            $options: "i",
          },
          name: "WO",
        });
        const findHolidayInMonth = await HolidaySchema.find({
          date: {
            $regex: ".*" + `${reverseMonth}` + ".*",
            $options: "i",
          },
          name: { $ne: "WO" },
        });

        const findTotalDaysInMonth = moment(
          params.month,
          "YYYY-MM"
        ).daysInMonth();

        const totalWorkingDays = findTotalDaysInMonth - holidayData.length;
        const totalObjectEntryInMonth =
          findAttendanceData.length +
          findWeekOffInMonth.length +
          findHolidayInMonth.length +
          unpaidLeaveData.length +
          paidLeaveData.length;

        const ABSEntry = findTotalDaysInMonth - totalObjectEntryInMonth;

        const paidDays =
          findAttendanceData.length + holidayData.length + paidLeaveData.length;

        const salaryTableData = await SalarySlabSchema.find({
          _id: salaryName,
          isDelete: false,
        });
        const totalCompensation = salaryTableData[0].totalCompensation;

        const calculateSalary = totalCompensation / findTotalDaysInMonth;

        const calculatedPayaBleAmount = calculateSalary * paidDays;

        await monthlyReportSchema.create({
          userId: params.userId,
          month: params.month,
          monthlyReport: params.monthlyReport,
          totalDays: findTotalDaysInMonth,
          workingDays: totalWorkingDays,
          paidLeave: paidLeaveData.length,
          unpaidLeave: unpaidLeaveData.length,
          totalWO: findWeekOffInMonth.length,
          noOfPresentDays: findAttendanceData.length,
          noOfHolidays: findHolidayInMonth.length,
          noOfPaidDays: paidDays,
          noOfAbsentDays: ABSEntry,
          payableSalary: calculatedPayaBleAmount,
        });
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async updatePaymentStatus(
    ID,
    params: {
      paymentStatus: string;
      salaryCreditedDate: string;
      bankRRNNumber: string;
    },
    callback: Function
  ) {
    try {
      const result = await monthlyReportSchema.find({ _id: ID });

      if (result[0].paymentStatus === PaymentStatus.CREDITED) {
        callback("credited");
        return;
      }

      await monthlyReportSchema.findByIdAndUpdate(ID, params);
      callback("true");
      // const data = await monthlyReportSchema
      //   .find({ userId: ID })
      //   .sort({ createdAt: -1 })
      //   .limit(1);
      // const previousMonth = moment().subtract(1, "months").format("YYYY-MM");
      // const salarySlab = await UserSchema.find({ _id: ID });

      // if (!data.length || data[0].month != previousMonth) {
      //   callback("report");
      //   return;
      // } else if (salarySlab[0].salarySlab === null) {
      //   // NEED TO LOOK INTO THIS LINE
      //   callback("salary");
      //   return;
      // } else {
      //   await monthlyReportSchema.findByIdAndUpdate(data[0].id, params);
      //   callback("true");
      // }
    } catch {
      callback("false");
    }
  }

  static async generateSalarySlip(
    ID,
    params: {
      salarySlip: string;
    },
    callback: Function
  ) {
    try {
      const result = await monthlyReportSchema.find({ _id: ID });

      if (result[0].salarySlip != PaymentStatus.PENDING) {
        callback("generated");
        return;
      }

      if (result[0].paymentStatus != PaymentStatus.CREDITED) {
        callback("status");
        return;
      } else {
        await monthlyReportSchema.findByIdAndUpdate(result[0].id, params);
        callback("true");
      }
      // const result = await monthlyReportSchema
      //   .find({ userId: ID })
      //   .sort({ createdAt: -1 })
      //   .limit(1);
      // if (result[0].paymentStatus != PaymentStatus.CREDITED) {
      //   callback("status");
      //   return;
      // } else {
      //   await monthlyReportSchema.findByIdAndUpdate(result[0].id, params);
      //   callback("true");
      // }
    } catch {
      callback("false");
    }
  }

  static async filterEmployee(
    Department,
    JobRole,
    EmployeeId,
    page,
    limit,
    callback: Function
  ) {
    try {
      if (!Department && !JobRole && !EmployeeId && !page && !limit) {
        const result = await UserSchema.find({
          userType: UserType.EMPLOYEE,
        });
        callback(result);
        return;
      }

      if (Department && !JobRole && !EmployeeId) {
        const result = await UserSchema.find({
          department: Department,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
        return;
      }
      // if (!Department && JobRole && !EmployeeId) {
      //   const result = await UserSchema.find({
      //     jobRole: JobRole,
      //     userType: UserType.EMPLOYEE,
      //   });
      //   callback(result);
      //   return;
      // }

      if (Department && JobRole && !EmployeeId) {
        const result = await UserSchema.find({
          department: Department,
          jobRole: JobRole,
          userType: UserType.EMPLOYEE,
        });
        callback(result);
        return;
      }

      if (!Department && !JobRole && EmployeeId) {
        const result = await UserSchema.find({
          userType: UserType.EMPLOYEE,
          employeeId: { $regex: ".*" + EmployeeId + ".*", $options: "i" },
        });
        callback(result);
        return;
      }
      const skip = (page - 1) * 10;
      if (!page) page = 1;
      if (!limit) limit = 10;
      const result = await UserSchema.find({ userType: UserType.EMPLOYEE })
        .skip(skip)
        .limit(limit);
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async fetchMonthlyReport(UserId, callback: Function) {
    try {
      if (!UserId) {
        const result = await monthlyReportSchema.find({}).populate("userId");
        callback(result);
        return;
      } else {
        const result = await monthlyReportSchema
          .find({ _id: UserId })
          .populate("userId");
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }
}

import {
  configurationSchema,
  ConfigurationType,
  ShiftType,
} from "../models/connfiguration.model";
import { Helper } from "../classes/Helper";
import { UserSchema } from "../models/user.model";
export class ConfigurationService {
  constructor() {}

  static async configureEmployId(
    params: {
      employeeId: string;
      configurationType: string;
    },
    callback: Function
  ) {
    try {
      const findEmpId = await configurationSchema.find({
        configurationType: ConfigurationType.EMPLOYEE_ID,
      });
      if (findEmpId && findEmpId.length) {
        callback(false);
      } else {
        const empId = params.employeeId + "0001";
        await UserSchema.findOneAndUpdate({}, { $set: { employeeId: empId } });
        await configurationSchema.create(params);
        callback(true);
      }
    } catch {
      callback(false);
    }
  }

  static async configureUpdateEmpId(
    userId,
    params: {
      employeeId: string;
    },
    callback: Function
  ) {
    try {
      await configurationSchema.findByIdAndUpdate(userId, params);
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async configureGetEmpId(callback: Function) {
    try {
      const data = await configurationSchema.find({
        configurationType: ConfigurationType.EMPLOYEE_ID,
      });
      callback(data);
    } catch {
      callback(false);
    }
  }

  static async configureAttendanceTime(
    params: {
      officeInStartTime: string;
      officeInEndTime: string;
      officeOutStartTime: string;
      officeOutEndTime: string;
      weekOff: string[];
      shiftType: string;
      configurationType: string;
    },
    callback: Function
  ) {
    try {
      const findDayShift = await configurationSchema.find({
        configurationType: ConfigurationType.ATTENDANCE,
        shiftType: ShiftType.DAY_SHIFT,
      });

      const findNightShift = await configurationSchema.find({
        configurationType: ConfigurationType.ATTENDANCE,
        shiftType: ShiftType.NIGHT_SHIFT,
      });

      if (
        (params.shiftType === ShiftType.DAY_SHIFT &&
          findDayShift.length === 0) ||
        (params.shiftType === ShiftType.NIGHT_SHIFT &&
          findNightShift.length === 0)
      ) {
        await configurationSchema.create(params);
        callback(true);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async configureUpdateAttendanceTime(
    Id,
    params: {
      officeInStartTime: string;
      officeInEndTime: string;
      officeOutStartTime: string;
      officeOutEndTime: string;
      weekOff: string;
    },
    callback: Function
  ) {
    try {
      await configurationSchema.findByIdAndUpdate(Id, params);
      callback(true);
    } catch {
      callback(false);
    }
  }
  static async configureGetAttendanceTime(callback: Function) {
    try {
      const data = await configurationSchema.find({
        configurationType: ConfigurationType.ATTENDANCE,
      });
      callback(data);
    } catch {
      callback(false);
    }
  }
}

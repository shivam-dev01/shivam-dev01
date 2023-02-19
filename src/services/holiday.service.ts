import moment, { months } from "moment";
import {
  configurationSchema,
  ConfigurationType,
  ShiftType,
  WeekOffDays,
} from "../models/connfiguration.model";
import { HolidaySchema } from "../models/holiday.model";

export class holidayService {
  constructor() {}

  static async addHoliday(
    bodyData,
    params: {
      month: string;
      year: string;
      name: string;
      date: string;
      holidayDate: string;
      description: string;
    },
    callback: Function
  ) {
    function sundaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 1;
      else firstDay = 8 - firstDay;
      var sundays = [firstDay];
      for (var i = sundays[0] + 7; i <= days; i += 7) {
        sundays.push(i);
      }
      return sundays;
    }

    function mondaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 2;
      else if (firstDay === 1) firstDay;
      else firstDay = 9 - firstDay;
      var mondays = [firstDay];
      for (var i = mondays[0] + 7; i <= days; i += 7) {
        mondays.push(i);
      }
      return mondays;
    }
    function tuesdaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 3;
      else if (firstDay === 1) firstDay = firstDay + 1;
      else if (firstDay === 2) firstDay = firstDay - 1;
      else firstDay = 10 - firstDay;
      var tuesdays = [firstDay];
      for (var i = tuesdays[0] + 7; i <= days; i += 7) {
        tuesdays.push(i);
      }
      return tuesdays;
    }
    function wednesdaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 4;
      else if (firstDay === 1) firstDay = firstDay + 2;
      else if (firstDay === 2) firstDay;
      else if (firstDay === 3) firstDay = firstDay - 2;
      else firstDay = 11 - firstDay;
      var wednesdays = [firstDay];
      for (var i = wednesdays[0] + 7; i <= days; i += 7) {
        wednesdays.push(i);
      }
      return wednesdays;
    }
    function thrusdaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 5;
      else if (firstDay === 1) firstDay = firstDay + 3;
      else if (firstDay === 2) firstDay = firstDay + 1;
      else if (firstDay === 3) firstDay = firstDay - 1;
      else if (firstDay === 4) firstDay = firstDay - 3;
      else firstDay = 12 - firstDay;
      var thrusdays = [firstDay];
      for (var i = thrusdays[0] + 7; i <= days; i += 7) {
        thrusdays.push(i);
      }
      return thrusdays;
    }
    function fridaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 6;
      else if (firstDay === 1) firstDay = firstDay + 4;
      else if (firstDay === 2) firstDay = firstDay + 2;
      else if (firstDay === 3) firstDay;
      else if (firstDay === 4) firstDay = firstDay - 2;
      else if (firstDay === 5) firstDay = firstDay - 4;
      else firstDay = 13 - firstDay;
      var fridays = [firstDay];
      for (var i = fridays[0] + 7; i <= days; i += 7) {
        fridays.push(i);
      }
      return fridays;
    }
    function saturdaysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate();
      var firstDay = new Date(month + "/01/" + year).getDay();
      if (firstDay === 0) firstDay = firstDay + 6;
      else firstDay = (14 - firstDay) % 7;
      var saturdays = [firstDay];
      for (var i = saturdays[0] + 7; i <= days; i += 7) {
        saturdays.push(i);
      }
      return saturdays;
    }

    try {
      const findConfigData = await configurationSchema.find({
        configurationType: ConfigurationType.ATTENDANCE,
        shiftType: ShiftType.DAY_SHIFT,
      });

      const findWO = await HolidaySchema.find({
        month: bodyData[0].month,
        year: bodyData[0].year,
        name: "WO",
      });
      // const WO = findWO.map((each: any) => {
      //   return each.name;
      // });
      const holidayDate = bodyData.map((each: any) => {
        return each.date;
      });
      // const matchWO = await HolidaySchema.find({ name: { $in: WO } });
      // const matchWO = await HolidaySchema.aggregate([
      //   {
      //     $match: {
      //       $and: [{ name: { $in: WO } }, { date: { $in: holidayDate } }],
      //     },
      //   },
      // ]);
      const data = bodyData.map((each: any) => {
        return each.name;
      });
      // const result = await HolidaySchema.find({ name: { $in: data } });
      const result = await HolidaySchema.aggregate([
        {
          $match: {
            $and: [
              { name: { $in: data } },
              { date: { $in: holidayDate } },
              { isDelete: false },
            ],
          },
        },
      ]);
      console.log(result.length);
      if (result && result.length) {
        callback("already");
        return;
      } else {
        await HolidaySchema.insertMany(bodyData);
        if (!findWO.length) {
          findConfigData[0].weekOff.map(async (each: any) => {
            if (each === WeekOffDays.FRIDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${fridaysInMonth(bodyData[0].month, bodyData[0].year)[0]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${fridaysInMonth(bodyData[0].month, bodyData[0].year)[1]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${fridaysInMonth(bodyData[0].month, bodyData[0].year)[2]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${fridaysInMonth(bodyData[0].month, bodyData[0].year)[3]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                fridaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      fridaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.MONDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${mondaysInMonth(bodyData[0].month, bodyData[0].year)[0]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${mondaysInMonth(bodyData[0].month, bodyData[0].year)[1]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${mondaysInMonth(bodyData[0].month, bodyData[0].year)[2]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${mondaysInMonth(bodyData[0].month, bodyData[0].year)[3]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                mondaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      mondaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.TUESDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[0]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: params.month,
                year: params.year,
                date:
                  `${
                    tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[1]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[2]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[3]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.WEDNESDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[0]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[1]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[2]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[3]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.THURSDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[0]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[1]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[2]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[3]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.SATURDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    saturdaysInMonth(bodyData[0].month, bodyData[0].year)[0]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    saturdaysInMonth(bodyData[0].month, bodyData[0].year)[1]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    saturdaysInMonth(bodyData[0].month, bodyData[0].year)[2]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${
                    saturdaysInMonth(bodyData[0].month, bodyData[0].year)[3]
                  }-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                saturdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      saturdaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
            if (each === WeekOffDays.SUNDAY) {
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${sundaysInMonth(bodyData[0].month, bodyData[0].year)[0]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${sundaysInMonth(bodyData[0].month, bodyData[0].year)[1]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${sundaysInMonth(bodyData[0].month, bodyData[0].year)[2]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              await HolidaySchema.create({
                month: bodyData[0].month,
                year: bodyData[0].year,
                date:
                  `${sundaysInMonth(bodyData[0].month, bodyData[0].year)[3]}-` +
                  `${bodyData[0].month}-` +
                  `${bodyData[0].year}`,
                name: "WO",
                description: "WO",
              });
              if (
                sundaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                undefined
              ) {
                return;
              } else {
                await HolidaySchema.create({
                  month: bodyData[0].month,
                  year: bodyData[0].year,
                  date:
                    `${
                      sundaysInMonth(bodyData[0].month, bodyData[0].year)[4]
                    }-` +
                    `${bodyData[0].month}-` +
                    `${bodyData[0].year}`,
                  name: "WO",
                  description: "WO",
                });
              }
            }
          });
        }
        callback("true");
      }
    } catch {
      callback("false");
    }
  }

  static async getHolidayList(months, years, callback: Function) {
    try {
      if ((years && months) || months) {
        callback(false);
        return;
      }

      if (!years && !months) {
        const result = await HolidaySchema.find({
          isDelete: false,
          name: { $ne: "WO" },
        });
        callback(result);
        return;
      }

      if (years && !months) {
        const result = await HolidaySchema.find({
          isDelete: false,
          year: years,
          name: { $ne: "WO" },
        });
        callback(result);
        return;
      }

      // if (!months && !years) {
      //   const result = await HolidaySchema.find({
      //     isDelete: false,
      //     name: { $ne: "WO" },
      //   });
      //   callback(result);
      // } else if (months && years) {
      //   const result = await HolidaySchema.find({
      //     month: months,
      //     year: years,
      //     isDelete: false,
      //     name: { $ne: "WO" },
      //   });
      //   callback(result);
      // } else if (months && !years) {
      //   const result = await HolidaySchema.find({
      //     month: months,
      //     isDelete: false,
      //     name: { $ne: "WO" },
      //   });
      //   callback(result);
      // } else if (!months && years) {
      //   const result = await HolidaySchema.find({
      //     year: years,
      //     isDelete: false,
      //     name: { $ne: "WO" },
      //   });
      //   callback(result);
      // }
    } catch {
      callback(false);
    }
  }

  static async removeHoliday(Id, callback: Function) {
    try {
      await HolidaySchema.findByIdAndUpdate(Id, { isDelete: true });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async updateHoliday(
    Id,
    params: {
      name: string;
      date: string;
      description: string;
    },
    callback: Function
  ) {
    try {
      const data = await HolidaySchema.find({
        name: params.name,
        isDelete: false,
      });
      if (!data.length) {
        await HolidaySchema.findByIdAndUpdate(Id, params);
        callback("true");
        return;
      }
      if (data[0].id === Id) {
        await HolidaySchema.findByIdAndUpdate(Id, params);
        callback("true");
        return;
      } else {
        callback("already");
      }
    } catch {
      callback("false");
    }
  }
}

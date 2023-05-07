"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.holidayService = void 0;
var connfiguration_model_1 = require("../models/connfiguration.model");
var holiday_model_1 = require("../models/holiday.model");
var holidayService = /** @class */ (function () {
    function holidayService() {
    }
    holidayService.addHoliday = function (bodyData, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            function sundaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 1;
                else
                    firstDay = 8 - firstDay;
                var sundays = [firstDay];
                for (var i = sundays[0] + 7; i <= days; i += 7) {
                    sundays.push(i);
                }
                return sundays;
            }
            function mondaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 2;
                else if (firstDay === 1)
                    firstDay;
                else
                    firstDay = 9 - firstDay;
                var mondays = [firstDay];
                for (var i = mondays[0] + 7; i <= days; i += 7) {
                    mondays.push(i);
                }
                return mondays;
            }
            function tuesdaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 3;
                else if (firstDay === 1)
                    firstDay = firstDay + 1;
                else if (firstDay === 2)
                    firstDay = firstDay - 1;
                else
                    firstDay = 10 - firstDay;
                var tuesdays = [firstDay];
                for (var i = tuesdays[0] + 7; i <= days; i += 7) {
                    tuesdays.push(i);
                }
                return tuesdays;
            }
            function wednesdaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 4;
                else if (firstDay === 1)
                    firstDay = firstDay + 2;
                else if (firstDay === 2)
                    firstDay;
                else if (firstDay === 3)
                    firstDay = firstDay - 2;
                else
                    firstDay = 11 - firstDay;
                var wednesdays = [firstDay];
                for (var i = wednesdays[0] + 7; i <= days; i += 7) {
                    wednesdays.push(i);
                }
                return wednesdays;
            }
            function thrusdaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 5;
                else if (firstDay === 1)
                    firstDay = firstDay + 3;
                else if (firstDay === 2)
                    firstDay = firstDay + 1;
                else if (firstDay === 3)
                    firstDay = firstDay - 1;
                else if (firstDay === 4)
                    firstDay = firstDay - 3;
                else
                    firstDay = 12 - firstDay;
                var thrusdays = [firstDay];
                for (var i = thrusdays[0] + 7; i <= days; i += 7) {
                    thrusdays.push(i);
                }
                return thrusdays;
            }
            function fridaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 6;
                else if (firstDay === 1)
                    firstDay = firstDay + 4;
                else if (firstDay === 2)
                    firstDay = firstDay + 2;
                else if (firstDay === 3)
                    firstDay;
                else if (firstDay === 4)
                    firstDay = firstDay - 2;
                else if (firstDay === 5)
                    firstDay = firstDay - 4;
                else
                    firstDay = 13 - firstDay;
                var fridays = [firstDay];
                for (var i = fridays[0] + 7; i <= days; i += 7) {
                    fridays.push(i);
                }
                return fridays;
            }
            function saturdaysInMonth(month, year) {
                var days = new Date(year, month, 0).getDate();
                var firstDay = new Date(month + "/01/" + year).getDay();
                if (firstDay === 0)
                    firstDay = firstDay + 6;
                else
                    firstDay = (14 - firstDay) % 7;
                var saturdays = [firstDay];
                for (var i = saturdays[0] + 7; i <= days; i += 7) {
                    saturdays.push(i);
                }
                return saturdays;
            }
            var findConfigData, findWO, WO, holidayDate, matchWO, data, result, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, connfiguration_model_1.configurationSchema.find({
                                configurationType: connfiguration_model_1.ConfigurationType.ATTENDANCE,
                                shiftType: connfiguration_model_1.ShiftType.DAY_SHIFT,
                            })];
                    case 1:
                        findConfigData = _b.sent();
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                month: bodyData[0].month,
                                year: bodyData[0].year,
                                name: "WO",
                            })];
                    case 2:
                        findWO = _b.sent();
                        WO = findWO.map(function (each) {
                            return each.name;
                        });
                        holidayDate = bodyData.map(function (each) {
                            return each.date;
                        });
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.aggregate([
                                {
                                    $match: {
                                        $and: [{ name: { $in: WO } }, { date: { $in: holidayDate } }],
                                    },
                                },
                            ])];
                    case 3:
                        matchWO = _b.sent();
                        data = bodyData.map(function (each) {
                            return each.name;
                        });
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.aggregate([
                                {
                                    $match: {
                                        $and: [{ name: { $in: data } }, { date: { $in: holidayDate } }],
                                    },
                                },
                            ])];
                    case 4:
                        result = _b.sent();
                        if (!(result && result.length)) return [3 /*break*/, 5];
                        callback("already");
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, holiday_model_1.HolidaySchema.insertMany(bodyData)];
                    case 6:
                        _b.sent();
                        if (!matchWO.length) {
                            findConfigData[0].weekOff.map(function (each) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(each === connfiguration_model_1.WeekOffDays.FRIDAY)) return [3 /*break*/, 7];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(fridaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(fridaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(fridaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(fridaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 4:
                                            _a.sent();
                                            if (!(fridaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 5];
                                            return [2 /*return*/];
                                        case 5: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(fridaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7:
                                            if (!(each === connfiguration_model_1.WeekOffDays.MONDAY)) return [3 /*break*/, 14];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(mondaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 8:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(mondaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 9:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(mondaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 10:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(mondaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 11:
                                            _a.sent();
                                            if (!(mondaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 12];
                                            return [2 /*return*/];
                                        case 12: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(mondaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 13:
                                            _a.sent();
                                            _a.label = 14;
                                        case 14:
                                            if (!(each === connfiguration_model_1.WeekOffDays.TUESDAY)) return [3 /*break*/, 21];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 15:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: params.month,
                                                    year: params.year,
                                                    date: "".concat(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 16:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 17:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 18:
                                            _a.sent();
                                            if (!(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 19];
                                            return [2 /*return*/];
                                        case 19: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(tuesdaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 20:
                                            _a.sent();
                                            _a.label = 21;
                                        case 21:
                                            if (!(each === connfiguration_model_1.WeekOffDays.WEDNESDAY)) return [3 /*break*/, 28];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 22:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 23:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 24:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 25:
                                            _a.sent();
                                            if (!(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 26];
                                            return [2 /*return*/];
                                        case 26: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(wednesdaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 27:
                                            _a.sent();
                                            _a.label = 28;
                                        case 28:
                                            if (!(each === connfiguration_model_1.WeekOffDays.THURSDAY)) return [3 /*break*/, 35];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 29:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 30:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 31:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 32:
                                            _a.sent();
                                            if (!(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 33];
                                            return [2 /*return*/];
                                        case 33: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(thrusdaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 34:
                                            _a.sent();
                                            _a.label = 35;
                                        case 35:
                                            if (!(each === connfiguration_model_1.WeekOffDays.SATURDAY)) return [3 /*break*/, 42];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 36:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 37:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 38:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 39:
                                            _a.sent();
                                            if (!(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 40];
                                            return [2 /*return*/];
                                        case 40: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(saturdaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 41:
                                            _a.sent();
                                            _a.label = 42;
                                        case 42:
                                            if (!(each === connfiguration_model_1.WeekOffDays.SUNDAY)) return [3 /*break*/, 49];
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(sundaysInMonth(bodyData[0].month, bodyData[0].year)[0], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 43:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(sundaysInMonth(bodyData[0].month, bodyData[0].year)[1], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 44:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(sundaysInMonth(bodyData[0].month, bodyData[0].year)[2], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 45:
                                            _a.sent();
                                            return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                    month: bodyData[0].month,
                                                    year: bodyData[0].year,
                                                    date: "".concat(sundaysInMonth(bodyData[0].month, bodyData[0].year)[3], "-") +
                                                        "".concat(bodyData[0].month, "-") +
                                                        "".concat(bodyData[0].year),
                                                    name: "WO",
                                                    description: "WO",
                                                })];
                                        case 46:
                                            _a.sent();
                                            if (!(sundaysInMonth(bodyData[0].month, bodyData[0].year)[4] ===
                                                undefined)) return [3 /*break*/, 47];
                                            return [2 /*return*/];
                                        case 47: return [4 /*yield*/, holiday_model_1.HolidaySchema.create({
                                                month: bodyData[0].month,
                                                year: bodyData[0].year,
                                                date: "".concat(sundaysInMonth(bodyData[0].month, bodyData[0].year)[4], "-") +
                                                    "".concat(bodyData[0].month, "-") +
                                                    "".concat(bodyData[0].year),
                                                name: "WO",
                                                description: "WO",
                                            })];
                                        case 48:
                                            _a.sent();
                                            _a.label = 49;
                                        case 49: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        callback("true");
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    holidayService.getHolidayList = function (months, years, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        if (!(!months && !years)) return [3 /*break*/, 2];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                isDelete: false,
                                name: { $ne: "WO" },
                            })];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(months && years)) return [3 /*break*/, 4];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                month: months,
                                year: years,
                                isDelete: false,
                                name: { $ne: "WO" },
                            })];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(months && !years)) return [3 /*break*/, 6];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                month: months,
                                isDelete: false,
                                name: { $ne: "WO" },
                            })];
                    case 5:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(!months && years)) return [3 /*break*/, 8];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                year: years,
                                isDelete: false,
                                name: { $ne: "WO" },
                            })];
                    case 7:
                        result = _b.sent();
                        callback(result);
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    holidayService.removeHoliday = function (Id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.findByIdAndUpdate(Id, { isDelete: true })];
                    case 1:
                        _b.sent();
                        callback(true);
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    holidayService.updateHoliday = function (Id, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({ name: params.name })];
                    case 1:
                        data = _b.sent();
                        if (!!data.length) return [3 /*break*/, 3];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.findByIdAndUpdate(Id, params)];
                    case 2:
                        _b.sent();
                        callback("true");
                        return [2 /*return*/];
                    case 3:
                        if (!(data[0].id === Id)) return [3 /*break*/, 5];
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.findByIdAndUpdate(Id, params)];
                    case 4:
                        _b.sent();
                        callback("true");
                        return [2 /*return*/];
                    case 5:
                        callback("already");
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return holidayService;
}());
exports.holidayService = holidayService;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveService = void 0;
var moment_1 = __importDefault(require("moment"));
var leave_model_1 = require("../models/leave.model");
var approved_leaves_model_1 = require("../models/approved-leaves.model");
var leaveService = /** @class */ (function () {
    function leaveService() {
    }
    leaveService.applyLeave = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var date1, date2, days, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        date1 = (0, moment_1.default)(params.fromDate, "DD-MM-YYYY");
                        date2 = (0, moment_1.default)(params.toDate, "DD-MM-YYYY");
                        days = date2.diff(date1, "days");
                        // const firstDayOfMonth = moment().startOf("month").format("YYYY-MM");
                        // const data = await PaidUnpaidLeaveSchema.find({
                        //   userId: params.userId,
                        // });
                        // cron.schedule("*/10 * * * * *", () => {
                        //   console.log("cron nob is running.");
                        // });
                        return [4 /*yield*/, leave_model_1.LeaveSchema.create({
                                userId: params.userId,
                                fromDate: params.fromDate,
                                toDate: params.toDate,
                                subject: params.subject,
                                description: params.description,
                                noOfDays: days,
                            })];
                    case 1:
                        // const firstDayOfMonth = moment().startOf("month").format("YYYY-MM");
                        // const data = await PaidUnpaidLeaveSchema.find({
                        //   userId: params.userId,
                        // });
                        // cron.schedule("*/10 * * * * *", () => {
                        //   console.log("cron nob is running.");
                        // });
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
    leaveService.leaveRequestList = function (UserId, page, limit, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!UserId) return [3 /*break*/, 2];
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({
                                userId: UserId,
                            }).populate("userId")];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        skip = (page - 1) * 10;
                        if (!page)
                            page = 1;
                        if (!limit)
                            limit = 10;
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({ userId: UserId })
                                .skip(skip)
                                .limit(limit)
                                .populate("userId")];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    leaveService.adminLeaveRequestList = function (page, limit, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        skip = (page - 1) * 10;
                        if (!page)
                            page = 1;
                        if (!limit)
                            limit = 10;
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({
                                leaveApprovalState: { $ne: leave_model_1.LeaveApprovalState.CANCELED },
                            })
                                .populate("userId")
                                .skip(skip)
                                .limit(limit)];
                    case 1:
                        result = _b.sent();
                        callback(result);
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
    leaveService.updateLeave = function (Id, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var findLeaveData_1, getFromDate, fromDate, revFromDate, joinFromDate, toDate, revToDate, joinToDate, result, getDaysBetweenDates, startDate, endDate, dateList, getDaysBetweenDates, startDate, endDate, dateList, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, leave_model_1.LeaveSchema.findByIdAndUpdate(Id, {
                                leaveApprovalState: params.leaveApprovalState,
                            })];
                    case 1:
                        findLeaveData_1 = _b.sent();
                        getFromDate = findLeaveData_1.fromDate.slice(3, 10);
                        fromDate = findLeaveData_1.fromDate.split("-");
                        revFromDate = fromDate.reverse();
                        joinFromDate = revFromDate.join("-");
                        toDate = findLeaveData_1.toDate.split("-");
                        revToDate = toDate.reverse();
                        joinToDate = revToDate.join("-");
                        if (!(Id && params.leaveApprovalState === leave_model_1.LeaveApprovalState.APPROVED)) return [3 /*break*/, 6];
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.find({
                                userId: findLeaveData_1.userId,
                                $or: [{ date: { $regex: ".*" + getFromDate + ".*", $options: "i" } }],
                            }).populate("userId")];
                    case 2:
                        result = _b.sent();
                        if (!(result && result.length)) return [3 /*break*/, 4];
                        getDaysBetweenDates = function (startDate, endDate) {
                            var now = startDate.clone(), dates = [];
                            while (now.isSameOrBefore(endDate)) {
                                dates.push({
                                    date: now.format("DD-MM-YYYY"),
                                    userId: findLeaveData_1.userId,
                                    leaveType: approved_leaves_model_1.LeaveType.UNPAID,
                                    leaveId: findLeaveData_1._id,
                                    settlementRequest: false,
                                });
                                now.add(1, "days");
                            }
                            return dates;
                        };
                        startDate = (0, moment_1.default)(joinFromDate);
                        endDate = (0, moment_1.default)(joinToDate);
                        dateList = getDaysBetweenDates(startDate, endDate);
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.insertMany(dateList)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        getDaysBetweenDates = function (startDate, endDate) {
                            var now = startDate.clone(), dates = [];
                            while (now.isSameOrBefore(endDate)) {
                                dates.push({
                                    date: now.format("DD-MM-YYYY"),
                                    userId: findLeaveData_1.userId,
                                    leaveType: dates.length === 0 ? approved_leaves_model_1.LeaveType.PAID : approved_leaves_model_1.LeaveType.UNPAID,
                                    leaveId: findLeaveData_1._id,
                                    settlementRequest: false,
                                });
                                now.add(1, "days");
                            }
                            return dates;
                        };
                        startDate = (0, moment_1.default)(joinFromDate);
                        endDate = (0, moment_1.default)(joinToDate);
                        dateList = getDaysBetweenDates(startDate, endDate);
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.insertMany(dateList)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        callback(true);
                        return [3 /*break*/, 8];
                    case 7:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    leaveService.adminGetSeparateLeaveRequestList = function (Id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({ _id: Id }).populate("userId")];
                    case 1:
                        result = _b.sent();
                        callback(result);
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
    leaveService.leaveSearch = function (Text, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!!Text) return [3 /*break*/, 2];
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({}).populate("userId")];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, leave_model_1.LeaveSchema.find({
                            $or: [
                                { fromDate: { $regex: ".*" + Text + ".*", $options: "i" } },
                                { toDate: { $regex: ".*" + Text + ".*", $options: "i" } },
                                { subject: { $regex: ".*" + Text + ".*", $options: "i" } },
                                { description: { $regex: ".*" + Text + ".*", $options: "i" } },
                                {
                                    leaveApprovalState: { $regex: ".*" + Text + ".*", $options: "i" },
                                },
                            ],
                        }).populate("userId")];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    leaveService.employeeLeaveSearch = function (UserId, Text, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(!Text && UserId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, leave_model_1.LeaveSchema.find({ userId: UserId }).populate("userId")];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, leave_model_1.LeaveSchema.find({
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
                        }).populate("userId")];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return leaveService;
}());
exports.leaveService = leaveService;

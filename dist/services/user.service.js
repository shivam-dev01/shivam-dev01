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
exports.userServices = void 0;
var user_model_1 = require("../models/user.model");
var Helper_1 = require("../classes/Helper");
var connfiguration_model_1 = require("../models/connfiguration.model");
var login_info_model_1 = require("../models/login-info.model");
var attendance_model_1 = require("../models/attendance.model");
var empPersonalDetails_model_1 = require("../models/empPersonalDetails.model");
var moment_1 = __importDefault(require("moment"));
var holiday_model_1 = require("../models/holiday.model");
var mongoose_1 = __importDefault(require("mongoose"));
var approved_leaves_model_1 = require("../models/approved-leaves.model");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var userServices = /** @class */ (function () {
    function userServices() {
    }
    //-------------------ADMIN-EMPLOYYEE-DETAIL-------------------
    userServices.getNewEmployeeId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var empId1, obj1, employeeId2, abc, toNum1, eid, eid, eid, eid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.UserSchema.find({})
                            .sort({ _id: -1 })
                            .limit(1)
                            .select(" -_id employeeId")];
                    case 1:
                        empId1 = _a.sent();
                        obj1 = String(empId1);
                        employeeId2 = obj1.substring(15, 21);
                        abc = employeeId2.split("").slice(-4).map(Number);
                        toNum1 = parseInt(abc.join("")) + 1;
                        if (toNum1.toString().length <= 1) {
                            eid = String(obj1.substring(15, 17)) + "000" + toNum1;
                        }
                        else if (toNum1.toString().length == 2) {
                            eid = String(obj1.substring(15, 17)) + "00" + toNum1;
                        }
                        else if (toNum1.toString().length == 3) {
                            eid = String(obj1.substring(15, 17)) + "0" + toNum1;
                        }
                        else {
                            eid = String(obj1.substring(15, 17)) + toNum1;
                        }
                        return [2 /*return*/, eid];
                }
            });
        });
    };
    userServices.createEmployeeDetail = function (employeeParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var configData, empId, findCompanyName, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, user_model_1.UserSchema.findOne({})];
                    case 1:
                        configData = _a.sent();
                        if (configData.employeeId === null) {
                            callback("config");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getNewEmployeeId()];
                    case 2:
                        empId = _a.sent();
                        if (employeeParams.employeeId != empId) {
                            callback("idExists");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                userType: user_model_1.UserType.ROOT,
                            })];
                    case 3:
                        findCompanyName = _a.sent();
                        console.log(findCompanyName[0].organizationName, "----------");
                        // employeeParams.employeeId = empId;
                        // employeeParams.password = "123456";
                        return [4 /*yield*/, user_model_1.UserSchema.create({
                                fullName: employeeParams.fullName,
                                mobileNumber: employeeParams.mobileNumber,
                                password: "123456",
                                userType: user_model_1.UserType.EMPLOYEE,
                                organizationName: findCompanyName[0].organizationName,
                                department: employeeParams.department,
                                emailId: employeeParams.emailId,
                                selectDocumentType: employeeParams.selectDocumentType,
                                aadhaarNumber: employeeParams.aadhaarNumber,
                                jobRole: employeeParams.jobRole,
                                employeeId: empId,
                                documents: employeeParams.documents,
                            })];
                    case 4:
                        // employeeParams.employeeId = empId;
                        // employeeParams.password = "123456";
                        _a.sent();
                        return [4 /*yield*/, user_model_1.UserSchema.find().sort({ createdAt: -1 }).limit(1)];
                    case 5:
                        data = _a.sent();
                        // await PaidUnpaidLeaveSchema.create({
                        //   userId: data[0].id,
                        //   paidLeave: 1,
                        //   unpaidLeave: 0,
                        // });
                        callback(true);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        Helper_1.Helper.throwError(error_1);
                        callback("false");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userServices.updateEmployeeDetails = function (Id, employeeParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(Id, employeeParams
                            // {
                            //   new: true,
                            // }
                            )];
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
    userServices.getAllEmployeeDetails = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({ userType: user_model_1.UserType.EMPLOYEE })];
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
    userServices.getSpecificEmployeeDetails = function (userId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.findById({ _id: userId })];
                    case 1:
                        result = _b.sent();
                        callback([result]);
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
    userServices.loginInfo = function (loginInfoParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                fullName: loginInfoParams.fullName,
                                mobileNumber: loginInfoParams.mobileNumber,
                            })];
                    case 1:
                        data = _b.sent();
                        if (!(data && data.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, login_info_model_1.loginInfoSchema.create(loginInfoParams)];
                    case 2:
                        _b.sent();
                        callback(true);
                        return [3 /*break*/, 4];
                    case 3:
                        callback(false);
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
    userServices.fetchUsers = function (userId, bulkFetchUserIds) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!userId) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserSchema.findById(userId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.toObject()];
                    case 2:
                        if (!(bulkFetchUserIds && bulkFetchUserIds.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                _id: {
                                    $in: bulkFetchUserIds,
                                },
                            })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (each) { return each.toObject(); })];
                    case 4: return [4 /*yield*/, user_model_1.UserSchema.find({
                            userRole: { $ne: user_model_1.UserType.ADMIN },
                            id: userId,
                            isDelete: false,
                        }).sort({ createdAt: -1 })];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (each) { return each.toObject(); })];
                    case 6:
                        error_2 = _a.sent();
                        Helper_1.Helper.throwError("Error while fetching user");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userServices.userStatus = function (Id, getMobile, statusParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var userTableDetails, empData, getId, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                mobileNumber: getMobile,
                            })];
                    case 1:
                        userTableDetails = _b.sent();
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({ _id: Id })];
                    case 2:
                        empData = _b.sent();
                        getId = userTableDetails[0].id;
                        if (!(statusParams.approvalState === empPersonalDetails_model_1.ApprovalState.APPROVED &&
                            empData &&
                            empData.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.findByIdAndUpdate(Id, {
                                approvalState: statusParams.approvalState,
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(getId, {
                                profileVerificationState: true,
                            })];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(getId, {
                                approvalState: statusParams.approvalState,
                            })];
                    case 5:
                        _b.sent();
                        callback(empPersonalDetails_model_1.ApprovalState.APPROVED);
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(statusParams.approvalState === empPersonalDetails_model_1.ApprovalState.REJECTED &&
                            statusParams.remark &&
                            statusParams.remark.length &&
                            empData &&
                            empData.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.findByIdAndUpdate(Id, {
                                approvalState: statusParams.approvalState,
                                remark: statusParams.remark,
                            })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(getId, {
                                approvalState: statusParams.approvalState,
                                remark: statusParams.remark,
                            })];
                    case 8:
                        _b.sent();
                        callback(empPersonalDetails_model_1.ApprovalState.REJECTED);
                        return [3 /*break*/, 10];
                    case 9:
                        callback("false");
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    userServices.employeeStatus = function (Id, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({
                                _id: Id,
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 1:
                        userData = _b.sent();
                        if (!(userData && userData.length && params.status === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.findByIdAndUpdate(Id, {
                                isActive: params.status,
                            })];
                    case 2:
                        _b.sent();
                        callback("activate");
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(userData && userData.length && params.status === false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.findByIdAndUpdate(Id, {
                                isActive: params.status,
                            })];
                    case 4:
                        _b.sent();
                        callback("deactivate");
                        return [3 /*break*/, 6];
                    case 5:
                        callback("false");
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
    userServices.generateEmployeeId = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var configData, empId2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1.UserSchema.findOne({})];
                    case 1:
                        configData = _b.sent();
                        if (configData.employeeId === null) {
                            callback("config");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getNewEmployeeId()];
                    case 2:
                        empId2 = _b.sent();
                        console.log(empId2);
                        callback(empId2);
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userServices.lastGeneratedEmpId = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var configData, result, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_model_1.UserSchema.findOne({})];
                    case 1:
                        configData = _b.sent();
                        if (!(configData.employeeId === null)) return [3 /*break*/, 2];
                        callback("config");
                        return [2 /*return*/];
                    case 2: return [4 /*yield*/, user_model_1.UserSchema.find({}).limit(1).sort({ _id: -1 })];
                    case 3:
                        result = _b.sent();
                        data = result[0].employeeId;
                        callback(data);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    userServices.markAttendance = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTime, gmtCurrentTime, gmtCurrentTimeHourMin, findShiftType, findConfigureDayShiftTiming, lastDayShiftAttendance, dayInStartGMTTime, inStartHourMin, dayInEndGMTTime, inEndHourMin, dayOutStartGMTTime, outStartHourMin, dayOutEndGMTTime, outEndHourMin, currentDay, nextDay, lastDayShiftAttendanceData, todayDate, diffHours, time, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 19, , 20]);
                        currentTime = (0, moment_1.default)().format();
                        gmtCurrentTime = (0, moment_1.default)(currentTime).utc().format();
                        gmtCurrentTimeHourMin = (0, moment_1.default)(gmtCurrentTime).format("HH:mm");
                        return [4 /*yield*/, user_model_1.UserSchema.find({ _id: params.userId })];
                    case 1:
                        findShiftType = _b.sent();
                        return [4 /*yield*/, connfiguration_model_1.configurationSchema.find({
                                shiftType: findShiftType[0].assignedShift,
                            })];
                    case 2:
                        findConfigureDayShiftTiming = _b.sent();
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: params.userId,
                            })
                                .sort({ createdAt: -1 })
                                .select(["createdAt", "checkOutTime", "workReport", "checkInTime"])
                                .limit(1)];
                    case 3:
                        lastDayShiftAttendance = _b.sent();
                        dayInStartGMTTime = (0, moment_1.default)(findConfigureDayShiftTiming[0].officeInStartTime)
                            .utc()
                            .format();
                        inStartHourMin = (0, moment_1.default)(dayInStartGMTTime).format("HH:mm");
                        dayInEndGMTTime = (0, moment_1.default)(findConfigureDayShiftTiming[0].officeInEndTime)
                            .utc()
                            .format();
                        inEndHourMin = (0, moment_1.default)(dayInEndGMTTime).format("HH:mm");
                        dayOutStartGMTTime = (0, moment_1.default)(findConfigureDayShiftTiming[0].officeOutStartTime)
                            .utc()
                            .format();
                        outStartHourMin = (0, moment_1.default)(dayOutStartGMTTime).format("HH:mm");
                        dayOutEndGMTTime = (0, moment_1.default)(findConfigureDayShiftTiming[0].officeOutEndTime)
                            .utc()
                            .format();
                        outEndHourMin = (0, moment_1.default)(dayOutEndGMTTime).format("HH:mm");
                        console.log(gmtCurrentTimeHourMin, "should be greater than", inStartHourMin, "less than", inEndHourMin);
                        console.log(gmtCurrentTimeHourMin, "should be greater than", outStartHourMin, "less than", outEndHourMin);
                        currentDay = (0, moment_1.default)(currentTime).format("dddd").toUpperCase();
                        nextDay = (0, moment_1.default)()
                            .add(1, "days")
                            .format("dddd")
                            .toLocaleUpperCase();
                        if ((params.attendanceType === attendance_model_1.AttendanceType.IN &&
                            currentDay === findConfigureDayShiftTiming[0].weekOff[0]) ||
                            (params.attendanceType === attendance_model_1.AttendanceType.IN &&
                                currentDay === findConfigureDayShiftTiming[0].weekOff[1]) ||
                            (params.attendanceType === attendance_model_1.AttendanceType.OUT &&
                                currentDay === findConfigureDayShiftTiming[0].weekOff[1])) {
                            callback("weekOff");
                            return [2 /*return*/];
                        }
                        if (!(lastDayShiftAttendance && lastDayShiftAttendance.length)) return [3 /*break*/, 13];
                        lastDayShiftAttendanceData = lastDayShiftAttendance[0];
                        todayDate = (0, moment_1.default)();
                        if (!(params.attendanceType === attendance_model_1.AttendanceType.IN &&
                            todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day"))) return [3 /*break*/, 4];
                        callback("already");
                        return [2 /*return*/];
                    case 4:
                        if (!(params.attendanceType === attendance_model_1.AttendanceType.OUT &&
                            gmtCurrentTimeHourMin >= outStartHourMin &&
                            gmtCurrentTimeHourMin <= outEndHourMin &&
                            params.workReport.length &&
                            !todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day"))) return [3 /*break*/, 6];
                        params.checkOutTime = (0, moment_1.default)().format();
                        params.date = (0, moment_1.default)().format("DD-MM-YYYY");
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.create(params)];
                    case 5:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 12];
                    case 6:
                        if (!(params.attendanceType === attendance_model_1.AttendanceType.OUT &&
                            params.workReport.length &&
                            lastDayShiftAttendanceData.workReport != null &&
                            todayDate.isSame(lastDayShiftAttendanceData.createdAt, "day"))) return [3 /*break*/, 7];
                        callback("reportAlready");
                        return [2 /*return*/];
                    case 7:
                        if (!(gmtCurrentTimeHourMin >= inStartHourMin &&
                            gmtCurrentTimeHourMin <= inEndHourMin &&
                            params.attendanceType === attendance_model_1.AttendanceType.IN)) return [3 /*break*/, 9];
                        params.checkInTime = (0, moment_1.default)().format();
                        params.date = (0, moment_1.default)().format("DD-MM-YYYY");
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.create(params)];
                    case 8:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 12];
                    case 9:
                        if (!(gmtCurrentTimeHourMin >= outStartHourMin &&
                            gmtCurrentTimeHourMin <= outEndHourMin &&
                            lastDayShiftAttendanceData.workReport === null &&
                            params.attendanceType === attendance_model_1.AttendanceType.OUT &&
                            params.workReport.length &&
                            params.workReport.length)) return [3 /*break*/, 11];
                        diffHours = (0, moment_1.default)((0, moment_1.default)().format()).diff((0, moment_1.default)(lastDayShiftAttendance[0].checkInTime), "m");
                        time = Math.floor(diffHours / 60) + ":" + (diffHours % 60);
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.findByIdAndUpdate(lastDayShiftAttendance[0]._id, {
                                workReport: params.workReport,
                                checkOutTime: (0, moment_1.default)().format(),
                                attendanceType: params.attendanceType,
                                workingHour: time < "8:00" || time === "NaN:NaN" ? "HALF-DAY" : time,
                            })];
                    case 10:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 12];
                    case 11:
                        callback("false");
                        _b.label = 12;
                    case 12: return [3 /*break*/, 18];
                    case 13:
                        if (!(gmtCurrentTimeHourMin >= inStartHourMin &&
                            gmtCurrentTimeHourMin <= inEndHourMin &&
                            params.attendanceType === attendance_model_1.AttendanceType.IN)) return [3 /*break*/, 15];
                        params.checkInTime = (0, moment_1.default)().format();
                        params.date = (0, moment_1.default)().format("DD-MM-YYYY");
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.create(params)];
                    case 14:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 18];
                    case 15:
                        if (!(gmtCurrentTimeHourMin >= outStartHourMin &&
                            gmtCurrentTimeHourMin <= outEndHourMin &&
                            params.attendanceType === attendance_model_1.AttendanceType.OUT &&
                            params.workReport.length &&
                            params.workReport.length)) return [3 /*break*/, 17];
                        params.checkOutTime = (0, moment_1.default)().format();
                        params.date = (0, moment_1.default)().format("DD-MM-YYYY");
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.create(params)];
                    case 16:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 18];
                    case 17:
                        callback("false");
                        _b.label = 18;
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    userServices.getAdminProfileDetails = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({ userType: user_model_1.UserType.ROOT })];
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
    userServices.updateAdminProfile = function (Id, profileParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({ _id: Id })];
                    case 1:
                        data = _b.sent();
                        if (!(data && data.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(Id, profileParams)];
                    case 2:
                        _b.sent();
                        callback(true);
                        return [3 /*break*/, 4];
                    case 3:
                        callback(false);
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
    userServices.getLastLoginTime = function (mobile, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, login_info_model_1.loginInfoSchema
                                .find({ mobileNumber: mobile })
                                .limit(1)
                                .sort({ _id: -1 })];
                    case 1:
                        result = _a.sent();
                        data = result[0].loginInTime;
                        callback(data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        callback(false);
                        Helper_1.Helper.throwError("Error while fetching login time.", error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userServices.assignShift = function (Id, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(Id, {
                                assignedShift: params.assignShift,
                            })];
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
    userServices.getAttendanceReport = function (UserId, page, limit, callback) {
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
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({ userId: UserId })
                                .skip(skip)
                                .limit(limit)
                                .populate("userId")];
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
    userServices.getSingleReport = function (Id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({ _id: Id }).populate("userId")];
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
    userServices.getCustomReport = function (Department, Date, page, limit, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result_1, result_2, data, result1, result_3, data, result1, result2, skip, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        if (!(Date && !Department)) return [3 /*break*/, 2];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                $or: [
                                    {
                                        checkInTime: { $regex: ".*" + Date + ".*", $options: "i" },
                                    },
                                    {
                                        checkOutTime: { $regex: ".*" + Date + ".*", $options: "i" },
                                    },
                                ],
                            }).populate("userId")];
                    case 1:
                        result_1 = _b.sent();
                        callback(result_1);
                        return [2 /*return*/];
                    case 2:
                        if (!(Department && !Date)) return [3 /*break*/, 5];
                        return [4 /*yield*/, user_model_1.UserSchema.aggregate([
                                {
                                    $match: { department: Department },
                                },
                            ])];
                    case 3:
                        result_2 = _b.sent();
                        data = result_2.map(function (each) {
                            return each._id;
                        });
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: { $in: data },
                            }).populate("userId")];
                    case 4:
                        result1 = _b.sent();
                        console.log(result1);
                        callback(result1);
                        return [2 /*return*/];
                    case 5:
                        if (!(Department && Date)) return [3 /*break*/, 9];
                        return [4 /*yield*/, user_model_1.UserSchema.aggregate([
                                {
                                    $match: { department: Department },
                                },
                            ])];
                    case 6:
                        result_3 = _b.sent();
                        data = result_3.map(function (each) {
                            return each._id;
                        });
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: { $in: data },
                            }).populate("userId")];
                    case 7:
                        result1 = _b.sent();
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                $or: [
                                    {
                                        checkInTime: { $regex: ".*" + Date + ".*", $options: "i" },
                                    },
                                    {
                                        checkOutTime: { $regex: ".*" + Date + ".*", $options: "i" },
                                    },
                                ],
                            }).populate("userId")];
                    case 8:
                        result2 = _b.sent();
                        // let array = [];
                        // array.push(result1);
                        // array.push(result2);
                        console.log(result1, result2);
                        callback(result1, result2);
                        _b.label = 9;
                    case 9:
                        skip = (page - 1) * 10;
                        if (!page)
                            page = 1;
                        if (!limit)
                            limit = 10;
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({})
                                .skip(skip)
                                .limit(limit)
                                .populate("userId")];
                    case 10:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 12];
                    case 11:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    userServices.getCustomEmployeeList = function (page, limit, callback) {
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
                        return [4 /*yield*/, user_model_1.UserSchema.find({ userType: user_model_1.UserType.EMPLOYEE })
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
    userServices.filteredEmployee = function (shift, department, jobRole, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, result, result, result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        if (!(!shift && !department && !jobRole)) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        _b.label = 2;
                    case 2:
                        if (!(shift && department && jobRole)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                assignedShift: shift,
                                userType: user_model_1.UserType.EMPLOYEE,
                                department: department,
                                jobRole: jobRole,
                            })];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        _b.label = 4;
                    case 4:
                        if (!(shift && !department && !jobRole)) return [3 /*break*/, 6];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                assignedShift: shift,
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 5:
                        result = _b.sent();
                        callback(result);
                        _b.label = 6;
                    case 6:
                        if (!(shift && department && !jobRole)) return [3 /*break*/, 8];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                assignedShift: shift,
                                department: department,
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 7:
                        result = _b.sent();
                        callback(result);
                        _b.label = 8;
                    case 8:
                        if (!(!shift && department && !jobRole)) return [3 /*break*/, 10];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                department: department,
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 9:
                        result = _b.sent();
                        callback(result);
                        _b.label = 10;
                    case 10:
                        if (!(!shift && !department && jobRole)) return [3 /*break*/, 12];
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                jobRole: jobRole,
                                userType: user_model_1.UserType.EMPLOYEE,
                            })];
                    case 11:
                        result = _b.sent();
                        callback(result);
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    userServices.attendanceReport = function (Page, Limit, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        skip = (Page - 1) * 10;
                        if (!Page)
                            Page = 1;
                        if (!Limit)
                            Limit = 10;
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({})
                                .skip(skip)
                                .limit(Limit)
                                .populate("userId")];
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
    userServices.employeeAttendanceReport = function (AttendanceId, Page, Limit, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var skip, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        skip = (Page - 1) * 10;
                        if (!Page)
                            Page = 1;
                        if (!Limit)
                            Limit = 10;
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({ userId: AttendanceId })
                                .skip(skip)
                                .limit(Limit)
                                .populate("userId")];
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
    userServices.searchEmployee = function (Text, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!!Text) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_model_1.UserSchema.find({})];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, user_model_1.UserSchema.find({
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
                        })];
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
    userServices.searchAttendance = function (Text, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!!Text) return [3 /*break*/, 2];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({}).populate("userId")];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                            checkOutTime: "".concat(Text),
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
    userServices.employeeSearchAttendance = function (UserId, Text, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        if (!(!Text && UserId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({ userId: UserId }).populate("userId")];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                            userId: UserId,
                            $or: [
                                { workReport: { $regex: ".*" + Text + ".*", $options: "i" } },
                                { attendanceType: { $regex: ".*" + Text + ".*", $options: "i" } },
                                // { checkoutTime: { $regex: ".*" + Text + ".*", $options: "i" } },
                                // { checkInTime: { $regex: ".*" + Text + ".*", $options: "i" } },
                                // { createdAt: { $regex: ".*" + Text + ".*", $options: "i" } },
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
    userServices.uploadImage = function (Id, param, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(Id, {
                                profileImage: param.profileImage,
                            })];
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
    userServices.adminUploadImage = function (Id, param, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(Id, {
                                profileImage: param.profileImage,
                            })];
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
    userServices.monthlyYearlyAttendanceReport = function (UserId, month, year, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, result, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (!(UserId && !month && !year)) return [3 /*break*/, 2];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.aggregate([
                                {
                                    $match: {
                                        userId: new mongoose_1.default.Types.ObjectId(UserId),
                                    },
                                },
                                {
                                    $lookup: {
                                        from: IDatabaseSchema_1.IDatabaseSchema.USERS,
                                        localField: "userId",
                                        foreignField: "_id",
                                        as: "userId",
                                    },
                                },
                            ])];
                    case 1:
                        result = _b.sent();
                        callback(result);
                        _b.label = 2;
                    case 2:
                        if (!(UserId && !month && year)) return [3 /*break*/, 4];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {
                                                userId: new mongoose_1.default.Types.ObjectId(UserId),
                                            },
                                            { $expr: { $eq: [{ $year: "$createdAt" }, Number(year)] } },
                                        ],
                                    },
                                },
                                {
                                    $lookup: {
                                        from: IDatabaseSchema_1.IDatabaseSchema.USERS,
                                        localField: "userId",
                                        foreignField: "_id",
                                        as: "userId",
                                    },
                                },
                            ])];
                    case 3:
                        result = _b.sent();
                        callback(result);
                        _b.label = 4;
                    case 4:
                        if (!(UserId && month && year)) return [3 /*break*/, 6];
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.aggregate([
                                {
                                    $match: {
                                        $and: [
                                            {
                                                userId: new mongoose_1.default.Types.ObjectId(UserId),
                                            },
                                            { $expr: { $eq: [{ $year: "$createdAt" }, Number(year)] } },
                                            { $expr: { $eq: [{ $month: "$createdAt" }, Number(month)] } },
                                        ],
                                    },
                                },
                                {
                                    $lookup: {
                                        from: IDatabaseSchema_1.IDatabaseSchema.USERS,
                                        localField: "userId",
                                        foreignField: "_id",
                                        as: "userId",
                                    },
                                },
                            ])];
                    case 5:
                        result = _b.sent();
                        callback(result);
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    userServices.monthlyYearlyCompleteReport = function (UserId, Month, Year, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var approvedLeaveData, attendanceData, holidayData, array, i, i, i, approvedLeaveData, attendanceData, holidayData, array, i, i, i, approvedLeaveData, attendanceData, holidayData, array, i, i, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        if (!(UserId && Month && Year)) return [3 /*break*/, 4];
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.find({
                                userId: UserId,
                                date: {
                                    $regex: ".*" + "".concat(Month, "-").concat(Year) + ".*",
                                    $options: "i",
                                },
                            }).populate("userId")];
                    case 1:
                        approvedLeaveData = _b.sent();
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: UserId,
                                date: {
                                    $regex: ".*" + "".concat(Month, "-").concat(Year) + ".*",
                                    $options: "i",
                                },
                            }).populate("userId")];
                    case 2:
                        attendanceData = _b.sent();
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                $or: [
                                    {
                                        date: { $regex: ".*" + "".concat(Month, "-").concat(Year) + ".*", $options: "i" },
                                    },
                                ],
                            })];
                    case 3:
                        holidayData = _b.sent();
                        array = [];
                        for (i = 0; i < approvedLeaveData.length; i++) {
                            array.push(approvedLeaveData[i]);
                        }
                        for (i = 0; i < attendanceData.length; i++) {
                            array.push(attendanceData[i]);
                        }
                        for (i = 0; i < holidayData.length; i++) {
                            array.push(holidayData[i]);
                        }
                        array.sort(function (a, b) {
                            var splitA = a.date.split("-").reverse().join("-");
                            var splitB = b.date.split("-").reverse().join("-");
                            var date1 = new Date(splitA);
                            var date2 = new Date(splitB);
                            var date = date1 - date2;
                            return date;
                        });
                        callback(array);
                        return [3 /*break*/, 12];
                    case 4:
                        if (!(UserId && Year && !Month)) return [3 /*break*/, 8];
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.find({
                                userId: UserId,
                                date: {
                                    $regex: ".*" + "".concat(Year) + ".*",
                                    $options: "i",
                                },
                            }).populate("userId")];
                    case 5:
                        approvedLeaveData = _b.sent();
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: UserId,
                                date: {
                                    $regex: ".*" + "".concat(Year) + ".*",
                                    $options: "i",
                                },
                            }).populate("userId")];
                    case 6:
                        attendanceData = _b.sent();
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({
                                $or: [{ date: { $regex: ".*" + "".concat(Year) + ".*", $options: "i" } }],
                            })];
                    case 7:
                        holidayData = _b.sent();
                        array = [];
                        for (i = 0; i < approvedLeaveData.length; i++) {
                            array.push(approvedLeaveData[i]);
                        }
                        for (i = 0; i < attendanceData.length; i++) {
                            array.push(attendanceData[i]);
                        }
                        for (i = 0; i < holidayData.length; i++) {
                            array.push(holidayData[i]);
                        }
                        array.sort(function (a, b) {
                            var splitA = a.date.split("-").reverse().join("-");
                            var splitB = b.date.split("-").reverse().join("-");
                            var date1 = new Date(splitA);
                            var date2 = new Date(splitB);
                            var date = date1 - date2;
                            return date;
                        });
                        callback(array);
                        return [3 /*break*/, 12];
                    case 8:
                        if (!(UserId && !Year && !Month)) return [3 /*break*/, 12];
                        return [4 /*yield*/, approved_leaves_model_1.ApprovedLeaveSchema.find({
                                userId: UserId,
                            }).populate("userId")];
                    case 9:
                        approvedLeaveData = _b.sent();
                        return [4 /*yield*/, attendance_model_1.AttendanceSchema.find({
                                userId: UserId,
                            }).populate("userId")];
                    case 10:
                        attendanceData = _b.sent();
                        return [4 /*yield*/, holiday_model_1.HolidaySchema.find({})];
                    case 11:
                        holidayData = _b.sent();
                        array = [];
                        for (i = 0; i < approvedLeaveData.length; i++) {
                            array.push(approvedLeaveData[i]);
                        }
                        for (i = 0; i < attendanceData.length; i++) {
                            array.push(attendanceData[i]);
                        }
                        for (i = 0; i < holidayData.length; i++) {
                            array.push(holidayData[i]);
                        }
                        array.sort(function (a, b) {
                            var splitA = a.date.split("-").reverse().join("-");
                            var splitB = b.date.split("-").reverse().join("-");
                            var date1 = new Date(splitA);
                            var date2 = new Date(splitB);
                            var date = date1 - date2;
                            return date;
                        });
                        callback(array);
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return userServices;
}());
exports.userServices = userServices;

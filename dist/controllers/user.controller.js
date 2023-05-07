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
exports.monthlyYearlyCompleteReport = exports.monthlyYearlyAttendanceReport = exports.adminUploadImage = exports.uploadImage = exports.employeeSearchAttendance = exports.searchAttendance = exports.searchEmployee = exports.employeeAttendanceReport = exports.attendanceReport = exports.filteredEmployee = exports.getCustomEmployeeList = exports.getCustomReport = exports.getSingleReport = exports.getAttendanceReport = exports.assignShift = exports.getLastLoginTime = exports.updateAdminProfile = exports.getAdminProfileDetails = exports.markAttendance = exports.lastGeneratedEmpId = exports.generateEmployeeId = exports.userStatus = exports.loginInfo = exports.employeeStatus = exports.getspecifiedEmployeeDetails = exports.getAllEmployeeDetails = exports.updateEmployeeDetails = exports.createEmployeeDetails = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var user_service_1 = require("../services/user.service");
var Helper_1 = require("../classes/Helper");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var user_model_1 = require("../models/user.model");
var empPersonalDetails_model_1 = require("../models/empPersonalDetails.model");
//---------------------------CONFIGUREEMPLOYEE-DETAILS------------------------------------
var createEmployeeDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                fullName: body.fullName,
                emailId: body.emailId,
                department: body.department,
                selectDocumentType: body.selectDocumentType,
                mobileNumber: body.mobileNumber,
                aadhaarNumber: body.aadhaarNumber,
                jobRole: body.jobRole,
                employeeId: body.employeeId,
                password: body.password,
                documents: body.documents,
                userType: user_model_1.UserType.EMPLOYEE,
                profileUpdate: false,
                profileVerificationState: false,
            };
            user_service_1.userServices.createEmployeeDetail(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "config"
                    ? "You have not configured employee Id."
                    : result === "false"
                        ? "Failed"
                        : result === "idExists"
                            ? "Error while generating employee id, please generate another employee id."
                            : "Employee details created successfully.", result, result === "config"
                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                    : result === "false"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                        : result === "idExists"
                            ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                            : IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.createEmployeeDetails = createEmployeeDetails;
var updateEmployeeDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                fullName: body.fullName,
                // employeeId:
                emailId: body.emailId,
                selectDepartment: body.selectDepartment,
                selectDocumentType: body.selectDocumentType,
                mobileNumber: body.mobileNumber,
                aadhaarNumber: body.aadhaarNumber,
                selectRole: body.selectRole,
                image: body.image,
            };
            user_service_1.userServices.updateEmployeeDetails(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee details updated successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.updateEmployeeDetails = updateEmployeeDetails;
var getAllEmployeeDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getAllEmployeeDetails(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee details fetched  successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getAllEmployeeDetails = getAllEmployeeDetails;
var getspecifiedEmployeeDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getSpecificEmployeeDetails(req.params.userId, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee details get  successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getspecifiedEmployeeDetails = getspecifiedEmployeeDetails;
var employeeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                status: body.status,
            };
            user_service_1.userServices.employeeStatus(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "activate"
                    ? "Employee activated successfully."
                    : result === "deactivate"
                        ? "Employee deactivated successfully."
                        : "Failed.", result, result === "activate"
                    ? IHttpStatuses_1.HttpStatuses.OK
                    : result === "deactivate"
                        ? IHttpStatuses_1.HttpStatuses.OK
                        : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employeeStatus = employeeStatus;
var loginInfo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                data = {
                    fullName: body.fullName,
                    mobileNumber: body.mobileNumber,
                    employeeId: body.employeeId,
                    loginInTime: body.loginInTime,
                    logoutTime: body.logoutTime,
                    ipAddress: body.ipAddress,
                    location: body.location,
                    deviceId: body.deviceId,
                    // activeHours: body.activeHours,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_service_1.userServices.loginInfo(data, function (result) {
                        new HttpResponse_1.HttpResponse(res, result ? "login info saved successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginInfo = loginInfo;
var userStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                data = {
                    approvalState: body.approvalState,
                    remark: body.remark,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_service_1.userServices.userStatus(req.params.id, req.params.mobileNumber, data, function (result) {
                        new HttpResponse_1.HttpResponse(res, result === empPersonalDetails_model_1.ApprovalState.REJECTED
                            ? "Profile details approval rejected."
                            : result === empPersonalDetails_model_1.ApprovalState.APPROVED
                                ? "User verified successfully."
                                : result === "false"
                                    ? "Failed."
                                    : null, result, result === empPersonalDetails_model_1.ApprovalState.REJECTED
                            ? IHttpStatuses_1.HttpStatuses.OK
                            : result === empPersonalDetails_model_1.ApprovalState.APPROVED
                                ? IHttpStatuses_1.HttpStatuses.OK
                                : result === "false"
                                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                                    : null).sendResponse();
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userStatus = userStatus;
var generateEmployeeId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.generateEmployeeId(function (result) {
                new HttpResponse_1.HttpResponse(res, result === "config"
                    ? "You have not configured employee id."
                    : result === "false"
                        ? "Failed."
                        : "Employee id generated successfully.", result, result === "config"
                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                    : result === "false"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                        : IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.generateEmployeeId = generateEmployeeId;
var lastGeneratedEmpId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.lastGeneratedEmpId(function (result) {
                new HttpResponse_1.HttpResponse(res, result === "config"
                    ? "You have not configured employee Id."
                    : result === "false"
                        ? "Failed"
                        : "Employee id fetched successfully.", result, result === "config"
                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                    : result === "false"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                        : IHttpStatuses_1.HttpStatuses.OK).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.lastGeneratedEmpId = lastGeneratedEmpId;
var markAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, attendanceData;
    return __generator(this, function (_a) {
        body = req.body;
        attendanceData = {
            userId: body.userId,
            workReport: body.workReport,
            attendanceType: body.attendanceType,
            checkOutTime: body.checkOutTime,
            checkInTime: body.checkInTime,
            date: body.date,
        };
        try {
            user_service_1.userServices.markAttendance(attendanceData, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "true"
                    ? "Attendance marked successfully."
                    : result === "already"
                        ? "Attendance already marked."
                        : result === "false"
                            ? "Attendance can not marked."
                            : result === "reportAlready"
                                ? "Report has been already submitted."
                                : result === "weekOff"
                                    ? "Week off days, attendance can not marked."
                                    : null, result, result === "true"
                    ? IHttpStatuses_1.HttpStatuses.OK
                    : result === "already"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                        : result === "false"
                            ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                            : result === "reportAlready"
                                ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                                : result === "weekOff"
                                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                                    : null).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.markAttendance = markAttendance;
var getAdminProfileDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getAdminProfileDetails(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Admin details fetched  successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getAdminProfileDetails = getAdminProfileDetails;
var updateAdminProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                gender: body.gender,
                emailId: body.emailId,
                aadhaarNumber: body.aadhaarNumber,
                DOB: body.DOB,
                panCardNumber: body.panCardNumber,
                personalAddress: body.personalAddress,
                alternateMobileNumber: body.alternateMobileNumber,
                alternateEmailId: body.alternateEmailId,
            };
            user_service_1.userServices.updateAdminProfile(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Admin updated successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.updateAdminProfile = updateAdminProfile;
var getLastLoginTime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getLastLoginTime(req.params.mobileNumber, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Last login time fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getLastLoginTime = getLastLoginTime;
var assignShift = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                assignShift: body.assignShift,
            };
            user_service_1.userServices.assignShift(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Shift assigned successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.assignShift = assignShift;
var getAttendanceReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getAttendanceReport(req.query.userId, req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getAttendanceReport = getAttendanceReport;
var getSingleReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getSingleReport(req.params.id, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getSingleReport = getSingleReport;
var getCustomReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getCustomReport(req.query.department, req.query.date, req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getCustomReport = getCustomReport;
var getCustomEmployeeList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.getCustomEmployeeList(req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getCustomEmployeeList = getCustomEmployeeList;
var filteredEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.filteredEmployee(req.query.assignedShift, req.query.department, req.query.jobRole, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.filteredEmployee = filteredEmployee;
var attendanceReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.attendanceReport(req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.attendanceReport = attendanceReport;
var employeeAttendanceReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.employeeAttendanceReport(req.query.userId, req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employeeAttendanceReport = employeeAttendanceReport;
var searchEmployee = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.searchEmployee(req.query.text, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.searchEmployee = searchEmployee;
var searchAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.searchAttendance(req.query.text, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.searchAttendance = searchAttendance;
var employeeSearchAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.employeeSearchAttendance(req.query.userId, req.query.text, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employeeSearchAttendance = employeeSearchAttendance;
var uploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                profileImage: body.profileImage,
            };
            user_service_1.userServices.uploadImage(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Profile image uploaded successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.uploadImage = uploadImage;
var adminUploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                profileImage: body.profileImage,
            };
            user_service_1.userServices.adminUploadImage(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Profile image uploaded successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.adminUploadImage = adminUploadImage;
var monthlyYearlyAttendanceReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.monthlyYearlyAttendanceReport(req.query.userId, req.query.month, req.query.year, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.monthlyYearlyAttendanceReport = monthlyYearlyAttendanceReport;
var monthlyYearlyCompleteReport = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            user_service_1.userServices.monthlyYearlyCompleteReport(req.query.userId, req.query.month, req.query.year, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Report fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.monthlyYearlyCompleteReport = monthlyYearlyCompleteReport;

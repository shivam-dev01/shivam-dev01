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
exports.configureGetAttendanceTime = exports.configureUpdateAttendanceTime = exports.configureAttendanceTime = exports.configureGetEmployeeId = exports.configureUpdateEmployeeId = exports.configureEmployeeId = void 0;
var Helper_1 = require("../classes/Helper");
var HttpResponse_1 = require("../classes/HttpResponse");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var connfiguration_model_1 = require("../models/connfiguration.model");
var configuration_service_1 = require("../services/configuration.service");
var configureEmployeeId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                employeeId: body.employeeId,
                configurationType: connfiguration_model_1.ConfigurationType.EMPLOYEE_ID,
            };
            configuration_service_1.ConfigurationService.configureEmployId(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee id formate created successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureEmployeeId = configureEmployeeId;
var configureUpdateEmployeeId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                employeeId: body.employeeId,
            };
            configuration_service_1.ConfigurationService.configureUpdateEmpId(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee id updated successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureUpdateEmployeeId = configureUpdateEmployeeId;
var configureGetEmployeeId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            configuration_service_1.ConfigurationService.configureGetEmpId(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employee id fetched successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureGetEmployeeId = configureGetEmployeeId;
var configureAttendanceTime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                officeInStartTime: body.officeInStartTime,
                officeInEndTime: body.officeInEndTime,
                officeOutStartTime: body.officeOutStartTime,
                officeOutEndTime: body.officeOutEndTime,
                weekOff: body.weekOff,
                shiftType: body.shiftType,
                configurationType: connfiguration_model_1.ConfigurationType.ATTENDANCE,
            };
            configuration_service_1.ConfigurationService.configureAttendanceTime(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Office timing configured successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureAttendanceTime = configureAttendanceTime;
var configureUpdateAttendanceTime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                officeInStartTime: body.officeInStartTime,
                officeInEndTime: body.officeInEndTime,
                officeOutStartTime: body.officeOutStartTime,
                officeOutEndTime: body.officeOutEndTime,
                weekOff: body.weekOff,
            };
            configuration_service_1.ConfigurationService.configureUpdateAttendanceTime(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Configuration timing Updated successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureUpdateAttendanceTime = configureUpdateAttendanceTime;
var configureGetAttendanceTime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            configuration_service_1.ConfigurationService.configureGetAttendanceTime(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Attendance details fetched successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            Helper_1.Helper.throwError(error);
        }
        return [2 /*return*/];
    });
}); };
exports.configureGetAttendanceTime = configureGetAttendanceTime;
// //-----------------------------CONFIGURE-ADMIN-DETAILS-----------------------------------
// export const configureAdminDetails = async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const data = {
//       fullName: body.fullName,
//       mobileNumber: body.mobileNumber,
//       alternateMobileNumber: body.alternateMobileNumber,
//       emailId: body.emailId,
//       aadhaarNumber: body.aadhaarNumber,
//       personalAddress: body.personalAddress,
//       organisationName: body.organisationType,
//       desigination: body.desigination,
//       organisationType: body.organisationType,
//       officialPhoneNumber: body.officialPhoneNumber,
//       businessWebsite: body.businessWebsite,
//       businessEmail: body.businessEmail,
//       businessPanNumber: body.businessPanNumber,
//       gstNumber: body.gstNumber,
//       organisationAddress: body.organisationAddress,
//     };
//     ConfigurationService.adminDetail(data, (result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Admin details created successfully" : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error: any) {
//     Helper.throwError(error);
//   }
// };
// export const getAdminDetails = async (req: Request, res: Response) => {
//   try {
//     ConfigurationService.getAdminDetails((result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Admin Details fetched successfully." : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };
// export const configureUpdateAdminDetails = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const body = req.body;
//     const data = {
//       fullName: body.fullName,
//       mobileNumber: body.mobileNumber,
//       alternateMobileNumber: body.alternateMobileNumber,
//       emailId: body.emailId,
//       aadhaarNumber: body.aadhaarNumber,
//       personalAddress: body.personalAddress,
//       organisationName: body.organisationType,
//       desigination: body.desigination,
//       organisationType: body.organisationType,
//       officialPhoneNumber: body.officialPhoneNumber,
//       businessWebsite: body.businessWebsite,
//       businessEmail: body.businessEmail,
//       businessPanNumber: body.businessPanNumber,
//       gstNumber: body.gstNumber,
//       organisationAddress: body.organisationAddress,
//     };
//     ConfigurationService.configureUpdateAdminDetails(
//       req.params.id,
//       data,
//       (result: any) => {
//         new HttpResponse(
//           res,
//         result ? "Admin details updated successfully" : "Failed",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//         ).sendResponse();
//       }
//     );
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

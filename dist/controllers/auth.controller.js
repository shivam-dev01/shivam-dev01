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
exports.changePassword = exports.resetPassword = exports.verifyOtp = exports.sendOtp = exports.employerRegister = exports.testDb = exports.login = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var Messages_1 = require("../constants/Messages");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var auth_service_1 = require("../services/auth.service");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginParam, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Login controller:--", req.body);
                loginParam = {
                    mobileNumber: req.body.mobileNumber,
                    password: req.body.password,
                    companyAlias: req.body.companyAlias,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.AuthService.login(loginParam)];
            case 2:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, Messages_1.Messages.WELCOME_TO_NETCLACK_MESSAGE, result).sendResponse();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var testDb = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                fullName: "deepak",
                password: "1234",
                mobileNumber: 1234567,
                ipAddress: "11111",
                parent: "some parent",
                parentType: "body.parentType",
                location: "body.location",
                organizationName: "body.organizationName",
                userType: "body.userType",
                departmentName: "body.departmentName",
            };
            auth_service_1.AuthService.employerRegister(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "You are registered successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.testDb = testDb;
var employerRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                fullName: body.fullName,
                password: body.password,
                mobileNumber: body.mobileNumber,
                ipAddress: body.ipAddress,
                parent: body.parent,
                parentType: body.parentType,
                location: body.location,
                organizationName: body.organizationName,
                userType: body.userType,
                departmentName: body.departmentName,
                isRootUser: body.isRootUser ? body.isRootUser : false,
            };
            auth_service_1.AuthService.employerRegister(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "You are registered successfully" : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employerRegister = employerRegister;
var sendOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        body = req.body;
        data = {
            mobileNumber: body.mobileNumber,
        };
        try {
            auth_service_1.AuthService.sendOtp(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result
                    ? Messages_1.Messages.OTP_SENT_SUCCESS_MESSAGE
                    : Messages_1.Messages.OTP_SEND_FAILED_MESSAGE, result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.sendOtp = sendOtp;
var verifyOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        body = req.body;
        data = {
            sessionId: body.sessionId,
            otpValue: body.otpValue,
        };
        try {
            auth_service_1.AuthService.verifyOtp(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "OTP verified successfully." : "OTP not matched.", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.verifyOtp = verifyOtp;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        body = req.body;
        data = {
            mobileNumber: body.mobileNumber,
            password: body.password,
            otpValue: body.otpValue,
            sessionId: body.sessionId,
        };
        try {
            auth_service_1.AuthService.resetPassword(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "oldPass"
                    ? "Old password and new password can't be same."
                    : result === "true"
                        ? "Password changed successfully."
                        : result === "false"
                            ? "Failed."
                            : null, result, result === "oldPass"
                    ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                    : result === "true"
                        ? IHttpStatuses_1.HttpStatuses.OK
                        : result === "false"
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
exports.resetPassword = resetPassword;
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                data = {
                    newPassword: body.newPassword,
                    oldPassword: body.oldPassword,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_service_1.AuthService.changePassword(data, req.params.id, function (result) {
                        new HttpResponse_1.HttpResponse(res, result === "oldPass"
                            ? "Old password and new password can't be same"
                            : result === "true"
                                ? "Your password has been changed successfully"
                                : result === "false"
                                    ? "Your old password is incorrect"
                                    : null, result, result === "oldPass"
                            ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
                            : result === "true"
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
exports.changePassword = changePassword;

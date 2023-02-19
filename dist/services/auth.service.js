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
exports.AuthService = void 0;
var Api_1 = require("../classes/Api");
var Helper_1 = require("../classes/Helper");
var ExternalApis_1 = require("../constants/ExternalApis");
var Messages_1 = require("../constants/Messages");
var IExternalApi_1 = require("../interfaces/IExternalApi");
var empPersonalDetails_model_1 = require("../models/empPersonalDetails.model");
var user_model_1 = require("../models/user.model");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.login = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var user, findUser, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        params.password = Helper_1.Helper.hashPassword(params.password);
                        return [4 /*yield*/, user_model_1.UserSchema.findOne(params)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({
                                mobileNumber: params.mobileNumber,
                            })];
                    case 2:
                        findUser = _b.sent();
                        if (!user) {
                            Helper_1.Helper.throwError(Messages_1.Messages.WRONG_USERNAME_OR_PASSWORD_MESSAGE, null);
                            return [2 /*return*/];
                        }
                        if (findUser && findUser[0] && findUser[0].isActive === false) {
                            Helper_1.Helper.throwError("User is de-activated.");
                            return [2 /*return*/];
                        }
                        user = user.toObject();
                        user.companyId = params.companyAlias;
                        _a = user;
                        return [4 /*yield*/, Helper_1.Helper.generateLoginToken(user)];
                    case 3:
                        _a.accessToken = _b.sent();
                        return [2 /*return*/, user];
                    case 4:
                        error_1 = _b.sent();
                        Helper_1.Helper.throwError(Messages_1.Messages.WRONG_USERNAME_OR_PASSWORD_MESSAGE, error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.employerRegister = function (employerRegisterParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("reached here");
                        return [4 /*yield*/, user_model_1.UserSchema.create(employerRegisterParams)];
                    case 1:
                        _a.sent();
                        callback(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        Helper_1.Helper.throwError(error_2);
                        callback(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.sendOtp = function (otpParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                try {
                    api = {
                        url: "".concat(ExternalApis_1.ExternalApis.SEND_OTP.replace("{mobileNumber}", otpParams.mobileNumber)),
                        requestMethod: IExternalApi_1.RequestMethod.GET,
                        input: {},
                        response: function (res) {
                            callback(res);
                        },
                    };
                    Api_1.Api.callApi(api);
                }
                catch (_b) {
                    callback(false);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.verifyOtp = function (verifyOtpParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var api;
            return __generator(this, function (_a) {
                try {
                    api = {
                        url: "".concat(ExternalApis_1.ExternalApis.VERIFY_OTP.replace("{otpValue}", verifyOtpParams.otpValue).replace("{sessionId}", verifyOtpParams.sessionId)),
                        requestMethod: IExternalApi_1.RequestMethod.GET,
                        input: {},
                        response: function (res) {
                            callback(res);
                        },
                        errorFunction: function (error) {
                            callback(false);
                        },
                    };
                    Api_1.Api.callApi(api);
                }
                catch (_b) {
                    callback(false);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.resetPassword = function (resetPasswordParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var api;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    api = {
                        url: "".concat(ExternalApis_1.ExternalApis.VERIFY_OTP.replace("{otpValue}", resetPasswordParams.otpValue).replace("{sessionId}", resetPasswordParams.sessionId)),
                        requestMethod: IExternalApi_1.RequestMethod.GET,
                        input: {},
                        response: function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var findUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, user_model_1.UserSchema.find({
                                            mobileNumber: resetPasswordParams.mobileNumber,
                                        })];
                                    case 1:
                                        findUser = _a.sent();
                                        if (!(findUser[0].password ===
                                            Helper_1.Helper.hashPassword(resetPasswordParams.password))) return [3 /*break*/, 2];
                                        callback("oldPass");
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(findUser, {
                                            password: Helper_1.Helper.hashPassword(resetPasswordParams.password),
                                        })];
                                    case 3:
                                        _a.sent();
                                        callback("true");
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); },
                        errorFunction: function (error) {
                            callback("false");
                        },
                    };
                    Api_1.Api.callApi(api);
                }
                catch (_b) {
                    callback("false");
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.changePassword = function (changePasswordParams, userId, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var changedPassword, findPassword, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                _id: userId,
                            })];
                    case 1:
                        changedPassword = _b.sent();
                        findPassword = changedPassword.map(function (getPassword) {
                            return getPassword.toJSON().password;
                        });
                        if (!(findPassword[0] ===
                            Helper_1.Helper.hashPassword(changePasswordParams.newPassword))) return [3 /*break*/, 2];
                        callback("oldPass");
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(findPassword[0] ===
                            Helper_1.Helper.hashPassword(changePasswordParams.oldPassword))) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(userId, {
                                password: Helper_1.Helper.hashPassword(changePasswordParams.newPassword),
                            })];
                    case 3:
                        _b.sent();
                        callback("true");
                        return [3 /*break*/, 5];
                    case 4:
                        callback("false");
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a = _b.sent();
                        callback("false");
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //-------------------ADMIN-EMPLOYYEE-DETAIL-------------------
    AuthService.configureCreateEmployeeDetail = function (adminDetailsParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.create(adminDetailsParams)];
                    case 1:
                        result = _a.sent();
                        callback(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        Helper_1.Helper.throwError(error_3);
                        callback(false);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.configureUpdateEmployeeDetails = function (Id, employeeParams, callback) {
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
    AuthService.getemployeeDetails = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({ isDelete: false })];
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
    return AuthService;
}());
exports.AuthService = AuthService;

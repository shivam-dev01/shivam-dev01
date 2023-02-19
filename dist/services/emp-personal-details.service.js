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
exports.empPersonalDetailsService = void 0;
var empPersonalDetails_model_1 = require("../models/empPersonalDetails.model");
var user_model_1 = require("../models/user.model");
var empPersonalDetailsService = /** @class */ (function () {
    function empPersonalDetailsService() {
    }
    empPersonalDetailsService.empPersonalDetails = function (params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var userTableData, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, user_model_1.UserSchema.find({
                                mobileNumber: params.mobileNumber,
                                emailId: params.emailId,
                                department: params.department,
                                jobRole: params.jobRole,
                                fullName: params.fullName,
                                aadhaarNumber: params.aadhaarNumber,
                            })];
                    case 1:
                        userTableData = _b.sent();
                        if (!(userTableData && userTableData.length)) return [3 /*break*/, 4];
                        params.employeeId = userTableData[0].employeeId;
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.create(params)];
                    case 2:
                        result = _b.sent();
                        return [4 /*yield*/, user_model_1.UserSchema.findByIdAndUpdate(userTableData[0].id, {
                                profileUpdate: true,
                            })];
                    case 3:
                        _b.sent();
                        callback(result);
                        return [3 /*break*/, 5];
                    case 4:
                        callback(false);
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    empPersonalDetailsService.empUpdatePersonalDetails = function (Id, params, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({
                                fullName: params.fullName,
                                jobRole: params.jobRole,
                                organizationName: params.organizationName,
                                department: params.department,
                                emailId: params.emailId,
                                DOB: params.DOB,
                                mobileNumber: params.mobileNumber,
                                gender: params.gender,
                                maritalStatus: params.maritalStatus,
                            })];
                    case 1:
                        data = _b.sent();
                        if (!(data && data.length)) return [3 /*break*/, 3];
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.findByIdAndUpdate(Id, params)];
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
    empPersonalDetailsService.empGetPersonalDetails = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({})];
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
    empPersonalDetailsService.empGetSpecifiedPersonalDetails = function (mobileNumber, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, empPersonalDetails_model_1.empPersonalDetailsSchema.find({
                                mobileNumber: mobileNumber,
                            })];
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
    return empPersonalDetailsService;
}());
exports.empPersonalDetailsService = empPersonalDetailsService;

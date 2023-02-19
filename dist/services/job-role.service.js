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
exports.jobRoleService = void 0;
var Helper_1 = require("../classes/Helper");
var jobRole_model_1 = require("../models/jobRole.model");
var jobRoleService = /** @class */ (function () {
    function jobRoleService() {
    }
    jobRoleService.addJobRole = function (jobRoleParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var getExistingRole, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, jobRole_model_1.jobRoleSchema.find({
                                departmentId: jobRoleParams.departmentId,
                                jobRole: jobRoleParams.jobRole,
                                isDelete: false,
                            })];
                    case 1:
                        getExistingRole = _a.sent();
                        if (!(getExistingRole && getExistingRole.length)) return [3 /*break*/, 2];
                        callback("exist");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, jobRole_model_1.jobRoleSchema.create(jobRoleParams)];
                    case 3:
                        _a.sent();
                        callback("true");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        Helper_1.Helper.throwError(error_1);
                        callback("false");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    jobRoleService.updateJobRole = function (id, jobRoleParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var jobRole, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, jobRole_model_1.jobRoleSchema.find({
                                departmentId: jobRoleParams.departmentId,
                                jobRole: jobRoleParams.jobRole,
                                isDelete: false,
                            })];
                    case 1:
                        jobRole = _b.sent();
                        if (!(jobRole && jobRole.length)) return [3 /*break*/, 2];
                        callback("exist");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, jobRole_model_1.jobRoleSchema.findByIdAndUpdate(id, jobRoleParams, {
                            new: true,
                        })];
                    case 3:
                        _b.sent();
                        callback("true");
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
    jobRoleService.deleteJobRole = function (id, isDelete, callback) {
        if (isDelete === void 0) { isDelete = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!(id && isDelete)) return [3 /*break*/, 2];
                        return [4 /*yield*/, jobRole_model_1.jobRoleSchema.findByIdAndUpdate(id, { isDelete: isDelete }, {
                                new: true,
                            })];
                    case 1:
                        _b.sent();
                        callback(true);
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        callback(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    jobRoleService.getJobRole = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, jobRole_model_1.jobRoleSchema
                                .find({ isDelete: false })
                                .populate("departmentId")];
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
    jobRoleService.getJobRoleByDep = function (Id, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, jobRole_model_1.jobRoleSchema
                                .find({ departmentId: Id, isDelete: false })
                                .populate("departmentId")];
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
    return jobRoleService;
}());
exports.jobRoleService = jobRoleService;

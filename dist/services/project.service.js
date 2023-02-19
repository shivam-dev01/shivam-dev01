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
exports.ProjectService = void 0;
var Helper_1 = require("../classes/Helper");
var task_service_1 = require("./task.service");
var project_model_1 = require("../models/project.model");
var ProjectService = /** @class */ (function () {
    function ProjectService() {
    }
    ProjectService.createUser = function (params, userId, isDelete) {
        if (isDelete === void 0) { isDelete = false; }
        return __awaiter(this, void 0, void 0, function () {
            var result_1, result_2, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(userId && !isDelete)) return [3 /*break*/, 2];
                        return [4 /*yield*/, project_model_1.ProjectSchema.findByIdAndUpdate(userId, params, {
                                new: true,
                            })];
                    case 1:
                        result_1 = _a.sent();
                        return [2 /*return*/, result_1.toObject()];
                    case 2:
                        if (!(userId && isDelete)) return [3 /*break*/, 4];
                        return [4 /*yield*/, project_model_1.ProjectSchema.findByIdAndUpdate(userId, { isDelete: isDelete }, {
                                new: true,
                            })];
                    case 3:
                        result_2 = _a.sent();
                        return [2 /*return*/, result_2.toObject()];
                    case 4: return [4 /*yield*/, project_model_1.ProjectSchema.create(params)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result.toObject()];
                    case 6:
                        error_1 = _a.sent();
                        Helper_1.Helper.throwError("Error while creating project.", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProjectService.fetchProjects = function (projectId, employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, projectMap_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = null;
                        if (!employeeId) return [3 /*break*/, 2];
                        return [4 /*yield*/, task_service_1.TaskService.fetchTasks([employeeId])];
                    case 1:
                        result = _a.sent();
                        projectMap_1 = {};
                        result.map(function (each) {
                            if (!projectMap_1[each.projectDetails._id]) {
                                projectMap_1[each.projectDetails._id] =
                                    Helper_1.Helper.convertMongoObjectToJSObject(each.projectDetails);
                            }
                        });
                        return [2 /*return*/, Array.from(Object.values(projectMap_1))];
                    case 2: return [4 /*yield*/, project_model_1.ProjectSchema.find({
                            id: projectId,
                            isDelete: false,
                        })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (each) { return each.toObject(); })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        Helper_1.Helper.throwError("Error while fetching project.", error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProjectService.employeesInProject = function (queryParams, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, project_model_1.ProjectSchema.find({ _id: queryParams }).populate("employees")];
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
    return ProjectService;
}());
exports.ProjectService = ProjectService;

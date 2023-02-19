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
exports.employeesInProject = exports.getProjectListing = exports.createProject = void 0;
var Helper_1 = require("../classes/Helper");
var HttpResponse_1 = require("../classes/HttpResponse");
var IExternalApi_1 = require("../interfaces/IExternalApi");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var user_model_1 = require("../models/user.model");
var project_service_1 = require("../services/project.service");
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, isDelete, body, obj, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                isDelete = req.method === IExternalApi_1.RequestMethod.DELETE;
                body = req.body;
                obj = {
                    projectName: body.projectName,
                    releaseCount: body.releaseCount,
                    deadlineDate: body.deadlineDate,
                    projectImagePath: body.projectImagePath,
                    projectDescription: body.projectDescription,
                    employees: body.employees,
                    jobRole: body.jobRole,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, project_service_1.ProjectService.createUser(obj, projectId, isDelete)];
            case 2:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, isDelete
                    ? "Project deleted successfully."
                    : projectId
                        ? "Project updated successfully."
                        : "Project registered successfully.", result).sendResponse();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
var getProjectListing = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, employeeId, users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                projectId = req.params.projectId;
                employeeId = null;
                if (Helper_1.Helper.getUserRole(res) === user_model_1.UserType.EMPLOYEE) {
                    employeeId = Helper_1.Helper.getUserId(res);
                }
                return [4 /*yield*/, project_service_1.ProjectService.fetchProjects(projectId, employeeId)];
            case 1:
                users = _a.sent();
                new HttpResponse_1.HttpResponse(res, "Project fetched successfully.", users).sendResponse();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProjectListing = getProjectListing;
var employeesInProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query;
    return __generator(this, function (_a) {
        try {
            query = req.query.projectId;
            project_service_1.ProjectService.employeesInProject(query, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Employees fetched successfully." : "Failed.", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employeesInProject = employeesInProject;

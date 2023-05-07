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
exports.getJobRole = exports.getJobRoles = exports.deleteJobRole = exports.updateJobRole = exports.addJobRole = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var IExternalApi_1 = require("../interfaces/IExternalApi");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var job_role_service_1 = require("../services/job-role.service");
var addJobRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                jobRole: body.jobRole,
                departmentId: body.departmentId,
            };
            job_role_service_1.jobRoleService.addJobRole(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "true"
                    ? "Job role added successfully."
                    : result === "exist"
                        ? "Job role already exist."
                        : result === "false"
                            ? "Failed."
                            : null, result, result === "true"
                    ? IHttpStatuses_1.HttpStatuses.OK
                    : result === "exist"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
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
exports.addJobRole = addJobRole;
var updateJobRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                jobRole: body.jobRole,
                departmentId: body.departmentId,
            };
            job_role_service_1.jobRoleService.updateJobRole(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result === "true"
                    ? "Job role updated successfully."
                    : result === "exist"
                        ? "Job role already exist."
                        : result === "false"
                            ? "Failed"
                            : null, result, result === "true"
                    ? IHttpStatuses_1.HttpStatuses.OK
                    : result === "exist"
                        ? IHttpStatuses_1.HttpStatuses.BAD_REQUEST
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
exports.updateJobRole = updateJobRole;
var deleteJobRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var isDelete;
    return __generator(this, function (_a) {
        isDelete = req.method === IExternalApi_1.RequestMethod.DELETE;
        try {
            job_role_service_1.jobRoleService.deleteJobRole(req.params.id, isDelete, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Job role deleted successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.deleteJobRole = deleteJobRole;
var getJobRoles = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            job_role_service_1.jobRoleService.getJobRole(function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Job role fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getJobRoles = getJobRoles;
var getJobRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            job_role_service_1.jobRoleService.getJobRoleByDep(req.params.id, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Job role fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.getJobRole = getJobRole;

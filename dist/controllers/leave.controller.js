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
exports.employeeLeaveSearch = exports.leaveSearch = exports.adminGetSeparateLeaveRequestList = exports.updateLeave = exports.adminLeaveRequestList = exports.leaveRequestList = exports.applyLeave = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var leave_service_1 = require("../services/leave.service");
var applyLeave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                userId: body.userId,
                fromDate: body.fromDate,
                toDate: body.toDate,
                subject: body.subject,
                description: body.description,
            };
            leave_service_1.leaveService.applyLeave(data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "leave request send successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.applyLeave = applyLeave;
var leaveRequestList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            leave_service_1.leaveService.leaveRequestList(req.query.userId, req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "leave request list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.leaveRequestList = leaveRequestList;
var adminLeaveRequestList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            leave_service_1.leaveService.adminLeaveRequestList(req.query.page, req.query.limit, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "leave request list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.adminLeaveRequestList = adminLeaveRequestList;
var updateLeave = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data;
    return __generator(this, function (_a) {
        try {
            body = req.body;
            data = {
                leaveApprovalState: body.leaveApprovalState,
            };
            leave_service_1.leaveService.updateLeave(req.params.id, data, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Leave status updated successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.updateLeave = updateLeave;
var adminGetSeparateLeaveRequestList = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            leave_service_1.leaveService.adminGetSeparateLeaveRequestList(req.params.id, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Leave request list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.adminGetSeparateLeaveRequestList = adminGetSeparateLeaveRequestList;
var leaveSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            leave_service_1.leaveService.leaveSearch(req.query.text, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Leave request list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.leaveSearch = leaveSearch;
var employeeLeaveSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            leave_service_1.leaveService.employeeLeaveSearch(req.query.userId, req.query.text, function (result) {
                new HttpResponse_1.HttpResponse(res, result ? "Leave request list fetched successfully." : "Failed", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
            });
        }
        catch (error) {
            new HttpResponse_1.HttpResponse(res).sendErrorResponse(error);
        }
        return [2 /*return*/];
    });
}); };
exports.employeeLeaveSearch = employeeLeaveSearch;

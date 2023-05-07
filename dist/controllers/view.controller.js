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
exports.createViews = exports.updateViews = exports.deleteViews = exports.getViews = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var IHttpStatuses_1 = require("../interfaces/IHttpStatuses");
var view_service_1 = require("../services/view.service");
var getViews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, view_service_1.ViewService.fetch()];
            case 1:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, "Views fetched successfully", result).sendResponse();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getViews = getViews;
var deleteViews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var viewId, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                viewId = req.params.viewId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, view_service_1.ViewService.delete(viewId)];
            case 2:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, result ? "View deleted successfully." : "Error while deleting view", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteViews = deleteViews;
var updateViews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, viewId, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                viewId = req.params.viewId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, view_service_1.ViewService.update(viewId, body)];
            case 2:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, result ? "View updated successfully" : "Error while updating the view", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateViews = updateViews;
var createViews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                data = {
                    viewName: body.viewName,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, view_service_1.ViewService.create(data)];
            case 2:
                result = _a.sent();
                new HttpResponse_1.HttpResponse(res, result ? "View Created Successfully" : "Error while creating view", result, result ? IHttpStatuses_1.HttpStatuses.OK : IHttpStatuses_1.HttpStatuses.BAD_REQUEST).sendResponse();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                new HttpResponse_1.HttpResponse(res).sendErrorResponse(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createViews = createViews;

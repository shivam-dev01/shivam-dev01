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
exports.securityMiddleware = void 0;
var HttpResponse_1 = require("../classes/HttpResponse");
var Environment_1 = require("../constants/Environment");
var jsonwebtoken_1 = require("jsonwebtoken");
var user_model_1 = require("../models/user.model");
var company_model_1 = require("../models/company.model");
var dbConnection_1 = require("./dbConnection");
var validateLoginToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var decoded, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, jsonwebtoken_1.verify)(token, Environment_1.Environment.JWT_SECRET_TOKEN)];
            case 1:
                decoded = _a.sent();
                return [2 /*return*/, decoded];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var securityMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var unauthorizedResponse, fetchCompanyId, authToken, decodedToken, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                unauthorizedResponse = function (message) {
                    new HttpResponse_1.HttpResponse(res, message ? message : "User Unauthorized", null, 401).sendResponse();
                };
                fetchCompanyId = function (companyAlias) { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, company_model_1.CompanySchema.findByCompanyAlias(companyAlias)];
                            case 1:
                                result = _a.sent();
                                return [2 /*return*/, result.companyAlias];
                        }
                    });
                }); };
                console.log(req.url);
                if (req.url.includes("/super/company")) {
                    req.headers["companyId"] = "master-collection";
                    next();
                    return [2 /*return*/];
                }
                if (!(req.url.includes("/auth/login") ||
                    req.url.includes("/auth/register") ||
                    req.url.includes("/auth/send-otp") ||
                    req.url.includes("/auth/verify-otp") ||
                    req.url.includes("/auth/reset-password"))) return [3 /*break*/, 2];
                if (!req.body["companyAlias"]) {
                    unauthorizedResponse("Company Alias is required.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, dbConnection_1.setUpDbConnection)()];
            case 1:
                _a.sent();
                // const companyId = await fetchCompanyId(req.body["companyAlias"]);
                console.log("Company Id in jwt config.ts:------- ", req.body["companyAlias"]);
                req.headers["companyId"] = req.body["companyAlias"];
                next();
                return [2 /*return*/];
            case 2:
                authToken = req.headers.authorization;
                if (!authToken) {
                    unauthorizedResponse();
                    return [2 /*return*/];
                }
                if (!authToken.includes("Bearer ")) {
                    unauthorizedResponse();
                    return [2 /*return*/];
                }
                authToken = authToken.replace("Bearer ", "");
                return [4 /*yield*/, validateLoginToken(authToken)];
            case 3:
                decodedToken = _a.sent();
                if (!decodedToken) {
                    unauthorizedResponse();
                    return [2 /*return*/];
                }
                if (decodedToken.companyId) {
                    req.headers["companyId"] = decodedToken.companyId;
                    next();
                    return [2 /*return*/];
                }
                if (!req.headers.companyid) {
                    unauthorizedResponse("Error while connecting to the database.");
                    return [2 /*return*/];
                }
                decodedToken = decodedToken;
                if (!decodedToken["id"]) return [3 /*break*/, 5];
                return [4 /*yield*/, user_model_1.UserSchema.activeUserById(decodedToken["id"])];
            case 4:
                user = _a.sent();
                if (!user) {
                    unauthorizedResponse("User is deactivated.");
                    return [2 /*return*/];
                }
                _a.label = 5;
            case 5:
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.securityMiddleware = securityMiddleware;

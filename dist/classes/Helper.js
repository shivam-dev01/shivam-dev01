"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
var Environment_1 = require("../constants/Environment");
var uuid_1 = require("uuid");
var _a = require("crypto"), scryptSync = _a.scryptSync, randomBytes = _a.randomBytes;
var googleapis_1 = require("googleapis");
var nodemailer_1 = __importDefault(require("nodemailer"));
var user_service_1 = require("../services/user.service");
var jsonwebtoken_1 = require("jsonwebtoken");
var clc = require("cli-color");
var cron = require("node-cron");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.hashPassword = function (password) {
        return scryptSync(password, Environment_1.Environment.PASSWORD_SALT_SECRET, 32).toString("hex");
    };
    Helper.throwError = function (message, error) {
        var errorObj = {
            error: error,
            message: message,
        };
        throw errorObj;
    };
    Helper.generateLoginToken = function (loginData) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, jsonwebtoken_1.sign)(__assign({}, loginData), Environment_1.Environment.JWT_SECRET_TOKEN, { expiresIn: "8h" })];
                    case 1:
                        token = _a.sent();
                        token = "Bearer ".concat(token);
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Helper.logger = function (message) {
        console.log(clc.greenBright(JSON.stringify(message)));
    };
    Helper.stringToObjectId = function (objectId) {
        var mongoose = require("mongoose");
        return mongoose.Types.ObjectId(objectId);
    };
    Helper.stringToObjectIdArray = function (objectIds) {
        var _this = this;
        return objectIds.map(function (each) { return _this.stringToObjectId(each); });
    };
    Helper.convertMongoObjectToJSObject = function (data) {
        data["id"] = data._id;
        delete data._id;
        delete data.__v;
        return data;
    };
    Helper.getUserRole = function (res) {
        return res.locals.userData.userRole;
    };
    Helper.getUserId = function (res) {
        return res.locals.userData.id;
    };
    Helper.protectedRoute = function (userData) {
        var _this = this;
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
    };
    Helper.generateUUID = function () {
        return (0, uuid_1.v4)();
    };
    Helper.sendEmail = function (userId, subject, htmlTemplate) {
        return __awaiter(this, void 0, void 0, function () {
            var OAuth2, user, createTransporter, sendEmail;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        OAuth2 = googleapis_1.google.auth.OAuth2;
                        return [4 /*yield*/, user_service_1.userServices.fetchUsers(userId)];
                    case 1:
                        user = _a.sent();
                        createTransporter = function () { return __awaiter(_this, void 0, void 0, function () {
                            var oauth2Client, accessToken, transporter;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        oauth2Client = new OAuth2(Environment_1.Environment.CLIENT_ID, Environment_1.Environment.CLIENT_SECRET, "https://developers.google.com/oauthplayground");
                                        oauth2Client.setCredentials({
                                            refresh_token: Environment_1.Environment.REFRESH_TOKEN,
                                        });
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                oauth2Client.getAccessToken(function (err, token) {
                                                    if (err) {
                                                        reject("Failed to create access token :(");
                                                    }
                                                    resolve(token);
                                                });
                                            })];
                                    case 1:
                                        accessToken = _a.sent();
                                        transporter = nodemailer_1.default.createTransport({
                                            service: "gmail",
                                            auth: {
                                                type: "OAuth2",
                                                user: Environment_1.Environment.EMAIL,
                                                accessToken: accessToken,
                                                clientId: Environment_1.Environment.CLIENT_ID,
                                                clientSecret: Environment_1.Environment.CLIENT_SECRET,
                                                refreshToken: Environment_1.Environment.REFRESH_TOKEN,
                                            },
                                        });
                                        return [2 /*return*/, transporter];
                                }
                            });
                        }); };
                        sendEmail = function (emailOptions) { return __awaiter(_this, void 0, void 0, function () {
                            var emailTransporter, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, createTransporter()];
                                    case 1:
                                        emailTransporter = _a.sent();
                                        return [4 /*yield*/, emailTransporter.sendMail(emailOptions)];
                                    case 2:
                                        result = _a.sent();
                                        console.log(result);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        if (!user) {
                            console.log("Email Send error ---", "User not found!");
                            return [2 /*return*/];
                        }
                        try {
                            sendEmail({
                                subject: subject,
                                html: htmlTemplate,
                                to: user.emailId,
                                from: Environment_1.Environment.EMAIL,
                            });
                        }
                        catch (error) {
                            console.log("Email Send error ---", error);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Helper.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    Helper.generatePassword = function (passwordLength) {
        var numberChars = "0123456789";
        var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lowerChars = "abcdefghijklmnopqrstuvwxyz";
        var allChars = numberChars + upperChars + lowerChars;
        var randPasswordArray = Array(passwordLength);
        randPasswordArray[0] = numberChars;
        randPasswordArray[1] = upperChars;
        randPasswordArray[2] = lowerChars;
        randPasswordArray = randPasswordArray.fill(allChars, 3);
        return this.shuffleArray(randPasswordArray.map(function (x) {
            return x[Math.floor(Math.random() * x.length)];
        })).join("");
    };
    return Helper;
}());
exports.Helper = Helper;

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
exports.RequestValidation = void 0;
var express_validator_1 = require("express-validator");
var HttpResponse_1 = require("./HttpResponse");
var RequestValidation = /** @class */ (function () {
    function RequestValidation() {
    }
    var _a;
    _a = RequestValidation;
    // sequential processing, stops running validations chain if the previous one have failed.
    RequestValidation.validateFunction = function (validations) {
        return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var errors, errorMessage;
            return __generator(_a, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all(validations.map(function (validation) { return validation.run(req); }))];
                    case 1:
                        _b.sent();
                        errors = (0, express_validator_1.validationResult)(req);
                        if (errors.isEmpty()) {
                            return [2 /*return*/, next()];
                        }
                        errorMessage = "NULL";
                        if (errors.array() && errors.array().length) {
                            errorMessage = errors.array()[0].msg;
                        }
                        new HttpResponse_1.HttpResponse(res, errorMessage, errors.array(), 400).sendResponse();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    return RequestValidation;
}());
exports.RequestValidation = RequestValidation;

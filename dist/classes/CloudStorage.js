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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorage = exports.PRESIGNED_URL_TYPE = void 0;
var uuid_1 = require("uuid");
var path = require("path");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var PRESIGNED_URL_TYPE;
(function (PRESIGNED_URL_TYPE) {
    PRESIGNED_URL_TYPE["READ"] = "read";
    PRESIGNED_URL_TYPE["WRITE"] = "write";
})(PRESIGNED_URL_TYPE = exports.PRESIGNED_URL_TYPE || (exports.PRESIGNED_URL_TYPE = {}));
var CloudStorage = /** @class */ (function () {
    function CloudStorage() {
        try {
            aws_sdk_1.default.config.loadFromPath(path.join(__dirname, "..", "assets", "s3_bucket.json"));
            this.bucket = new aws_sdk_1.default.S3();
            // this.bucket = new Storage({
            //   keyFilename: path.join(__dirname, "..", "assets", "cloud_storage.json"),
            // }).bucket(Environment.GOOGLE_BUCKET_NAME);
            // this.bucket.setCorsConfiguration([
            //   {
            //     maxAgeSeconds: [999999],
            //     method: ["*"],
            //     origin: ["*"],
            //     responseHeader: ["*"],
            //     "Access-Control-Allow-Origin": ["*"],
            //   },
            // ]);
        }
        catch (error) {
            console.log(error);
        }
    }
    CloudStorage.prototype.generateUrl = function (type, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var options, url, params, params;
            return __generator(this, function (_a) {
                options = {
                    version: "v4",
                    action: type,
                    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
                };
                url = null;
                try {
                    if (type === "read") {
                        params = { Bucket: "9tab-assets", Key: fileName };
                        url = this.bucket.getSignedUrl("getObject", params);
                        // [url] = await this.bucket.file(fileName).getSignedUrl(options);
                    }
                    else {
                        fileName = this.generateFileName(fileName);
                        params = { Bucket: "9tab-assets", Key: fileName };
                        url = this.bucket.getSignedUrl("putObject", params);
                        // [url] = await this.bucket.file(fileName).getSignedUrl(options);
                    }
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/, {
                        url: url,
                        fileName: fileName,
                    }];
            });
        });
    };
    CloudStorage.prototype.generateFileName = function (fileName) {
        return "".concat((0, uuid_1.v4)(), "/").concat(fileName);
    };
    return CloudStorage;
}());
exports.CloudStorage = CloudStorage;

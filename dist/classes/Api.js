"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
var axios_1 = __importDefault(require("axios"));
var IExternalApi_1 = require("../interfaces/IExternalApi");
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.callApi = function (apiParams) {
        var url = apiParams.url;
        var axiosInstance = null;
        switch (apiParams.requestMethod) {
            case IExternalApi_1.RequestMethod.GET:
                axiosInstance = axios_1.default.get(url);
                break;
            case IExternalApi_1.RequestMethod.POST:
                axiosInstance = axios_1.default.post(url, apiParams.input);
                break;
            case IExternalApi_1.RequestMethod.PUT:
                axiosInstance = axios_1.default.put(url, apiParams.input);
                break;
            case IExternalApi_1.RequestMethod.DELETE:
                axiosInstance = axios_1.default.delete(url, apiParams.input);
                break;
            default:
                axiosInstance = axios_1.default.get(url, apiParams.input);
                break;
        }
        axiosInstance
            .then(function (response) {
            if (apiParams.response) {
                if (response && response.data) {
                    apiParams.response(response.data);
                }
            }
        })
            .catch(function (error) {
            if (apiParams.errorFunction) {
                apiParams.errorFunction(error);
            }
        })
            .then(function () {
            if (apiParams.endFunction) {
                apiParams.endFunction();
            }
        });
    };
    return Api;
}());
exports.Api = Api;

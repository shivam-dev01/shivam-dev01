"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dbConnection_1 = require("./config/dbConnection");
var jwt_config_1 = require("./config/jwt.config");
var Environment_1 = require("./constants/Environment");
var routes_1 = __importDefault(require("./routes"));
var cors = require("cors");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
// setUpDbConnection(() => {});
app.use(jwt_config_1.securityMiddleware);
app.use(dbConnection_1.dbConnectionMiddleware);
app.use(routes_1.default);
app.listen(Environment_1.Environment.PORT_NUMBER, function () {
    console.log("This application is listening on port number:".concat(Environment_1.Environment.PORT_NUMBER));
    // Helper.fetchingActivatedUser();
    // Helper.runCronJob();
});

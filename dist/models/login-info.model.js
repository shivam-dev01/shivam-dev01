"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInfoSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    employeeId: { type: String, required: false, default: null },
    loginInTime: { type: String, required: true },
    logoutTime: { type: String, required: true },
    ipAddress: { type: String, required: true },
    location: { type: String, required: true },
    deviceId: { type: String, required: true },
    // activeHours: { type: String, required: false, default: null },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
exports.loginInfoSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.LOGIN_INFO, schema);

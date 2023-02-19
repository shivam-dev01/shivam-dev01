"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovedLeaveSchema = exports.LeaveType = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var LeaveType;
(function (LeaveType) {
    LeaveType["PAID"] = "PAID";
    LeaveType["UNPAID"] = "UNPAID";
})(LeaveType = exports.LeaveType || (exports.LeaveType = {}));
var schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    leaveType: {
        type: String,
        required: true,
        enum: LeaveType,
    },
    date: { type: String, required: false },
    leaveId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.LEAVE,
    },
    settlementRequest: { type: Boolean, required: false, default: false },
}, {
    timestamps: true,
});
exports.ApprovedLeaveSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.APPROVED_LEAVES, schema);

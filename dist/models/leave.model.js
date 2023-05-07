"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveSchema = exports.LeaveApprovalState = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var LeaveApprovalState;
(function (LeaveApprovalState) {
    LeaveApprovalState["PENDING"] = "PENDING";
    LeaveApprovalState["APPROVED"] = "APPROVED";
    LeaveApprovalState["REJECTED"] = "REJECTED";
    LeaveApprovalState["CANCELED"] = "CANCELED";
})(LeaveApprovalState = exports.LeaveApprovalState || (exports.LeaveApprovalState = {}));
var schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: false },
    subject: { type: String, required: true },
    description: { type: String, required: false },
    noOfDays: { type: String, required: false },
    leaveApprovalState: {
        type: String,
        required: true,
        enum: LeaveApprovalState,
        default: LeaveApprovalState.PENDING,
    },
    isDelete: { type: Boolean, required: false, default: false },
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.isDelete;
            delete ret.__v;
            return ret;
        },
    },
});
exports.LeaveSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.LEAVE, schema);

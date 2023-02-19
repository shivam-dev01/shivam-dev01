"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaidUnpaidLeaveSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    paidLeave: { type: Number, required: false },
    unpaidLeave: { type: Number, required: false },
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
exports.PaidUnpaidLeaveSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.PAID_UNPAID_LEAVES, schema);

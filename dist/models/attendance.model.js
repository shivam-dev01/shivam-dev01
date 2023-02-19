"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSchema = exports.AttendanceType = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var AttendanceType;
(function (AttendanceType) {
    AttendanceType["IN"] = "IN";
    AttendanceType["OUT"] = "OUT";
})(AttendanceType = exports.AttendanceType || (exports.AttendanceType = {}));
var schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    workReport: { type: String, required: false, default: null },
    isDelete: { type: Boolean, required: true, default: false },
    attendanceType: { type: String, enum: AttendanceType, required: true },
    checkOutTime: { type: String, required: false, default: null },
    checkInTime: { type: String, required: false, default: null },
    workingHour: { type: String, required: false, default: null },
    date: { type: String, required: false },
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.isDelete;
            delete ret.__v;
            return ret;
        },
    },
});
exports.AttendanceSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.ATTENDANCE, schema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationSchema = exports.WeekOffDays = exports.ShiftType = exports.ConfigurationType = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var ConfigurationType;
(function (ConfigurationType) {
    ConfigurationType["ATTENDANCE"] = "ATTENDANCE";
    ConfigurationType["EMPLOYEE_ID"] = "EMPLOYEE-ID";
})(ConfigurationType = exports.ConfigurationType || (exports.ConfigurationType = {}));
var ShiftType;
(function (ShiftType) {
    ShiftType["DAY_SHIFT"] = "DAY-SHIFT";
    ShiftType["NIGHT_SHIFT"] = "NIGHT-SHIFT";
})(ShiftType = exports.ShiftType || (exports.ShiftType = {}));
var WeekOffDays;
(function (WeekOffDays) {
    WeekOffDays["SUNDAY"] = "SUNDAY";
    WeekOffDays["MONDAY"] = "MONDAY";
    WeekOffDays["TUESDAY"] = "TUESDAY";
    WeekOffDays["WEDNESDAY"] = "WEDNESDAY";
    WeekOffDays["THURSDAY"] = "THURSDAY";
    WeekOffDays["FRIDAY"] = "FRIDAY";
    WeekOffDays["SATURDAY"] = "SATURDAY";
})(WeekOffDays = exports.WeekOffDays || (exports.WeekOffDays = {}));
var schema = new mongoose_1.Schema({
    officeInStartTime: { type: String, required: false },
    officeInEndTime: { type: String, required: false },
    officeOutStartTime: { type: String, required: false },
    officeOutEndTime: { type: String, required: false },
    weekOff: [{ type: String, required: false, enum: WeekOffDays }],
    shiftType: { type: String, required: false },
    employeeId: { type: String, required: false },
    configurationType: {
        type: String,
        required: false,
        enum: ConfigurationType,
    },
    isDelete: { type: Boolean, required: false, default: false },
}, {
    timestamps: true,
});
exports.configurationSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.CONFIGURATION, schema);

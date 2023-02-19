"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidaySchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    month: { type: String, required: false },
    year: { type: String, required: false },
    name: { type: String, required: false },
    description: { type: String, required: false },
    holidayDate: { type: String, required: false },
    date: { type: String, required: false },
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
exports.HolidaySchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.HOLIDAY, schema);

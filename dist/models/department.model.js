"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    department: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    departmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: IDatabaseSchema_1.IDatabaseSchema.DEPARTMENT,
    },
}, {
    timestamps: true,
    // toObject: {
    //   transform: function (doc, ret, options) {
    //     ret.id = ret._id;
    //     delete ret._id;
    //     delete ret.isDelete;
    //     delete ret.__v;
    //     return ret;
    //   },
    // },
});
exports.departmentSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.DEPARTMENT, schema);

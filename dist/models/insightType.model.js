"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insightTypeSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    insightType: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
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
exports.insightTypeSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.INSIGHT_TYPE, schema);

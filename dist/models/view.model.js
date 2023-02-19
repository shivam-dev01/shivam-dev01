"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    viewName: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
exports.ViewSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.VIEWS, schema);

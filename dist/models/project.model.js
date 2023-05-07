"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    projectName: { type: String, required: true },
    releaseCount: { type: Number, required: true },
    projectDescription: { type: String, required: false },
    deadlineDate: { type: String, required: false },
    projectImagePath: { type: String, required: false },
    isDelete: { type: Boolean, required: true, default: false },
    employees: [{ type: mongoose_1.Schema.Types.ObjectId,
            required: false,
            ref: IDatabaseSchema_1.IDatabaseSchema.USERS, }],
    jobRole: [{ type: String, required: false }],
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
exports.ProjectSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.PROJECT, schema);

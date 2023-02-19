"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    companyId: { type: String, required: true },
    companyName: { type: String, required: true },
    companyAlias: { type: String, required: true },
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
schema.statics.findByCompanyAlias = function (id) {
    return this.findOne({ companyAlias: id, isDelete: false });
};
exports.CompanySchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.COMPANIES, schema);

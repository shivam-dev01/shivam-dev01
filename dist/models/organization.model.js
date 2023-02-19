"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
    designation: { type: String, required: true },
    organizationType: { type: String, required: true },
    officialMobileNumber: { type: Number, required: true },
    businessWebsite: { type: String, required: false },
    businessPanCardNumber: { type: String, required: false },
    gstNumber: { type: String, required: true },
    organizationAddress: { type: String, required: true },
    businessEmail: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
    adminName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    organizationName: { type: String, required: true },
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
exports.organizationSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.ORGANIZATION_DETAILS, schema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empPersonalDetailsSchema = exports.ApprovalState = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var ApprovalState;
(function (ApprovalState) {
    ApprovalState["APPROVED"] = "APPROVED";
    ApprovalState["REJECTED"] = "REJECTED";
    ApprovalState["PENDING"] = "PENDING";
})(ApprovalState = exports.ApprovalState || (exports.ApprovalState = {}));
var schema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    emailId: { type: String, required: true },
    gender: { type: String, required: true },
    DOB: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    department: { type: String, required: true },
    jobRole: { type: String, required: true },
    organizationName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianMobileNumber: { type: Number, required: true },
    alternateGuardianName: { type: String, required: false },
    alternateGuardianMobileNumber: { type: Number, required: false },
    educationDetails: { type: Array, required: true },
    permanentAddress: { type: Array, required: true },
    currentAddress: { type: Array, required: true },
    aadhaarNumber: { type: Number, required: true },
    panCardNumber: { type: String, required: true },
    passportNumber: { type: String, required: true },
    approvalState: {
        type: String,
        required: false,
        enum: ApprovalState,
        default: ApprovalState.PENDING,
    },
    remark: {
        type: String,
        required: false,
        default: null,
    },
    employeeId: {
        type: String,
        required: false,
        default: null,
    },
    profileImage: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
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
exports.empPersonalDetailsSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.EMP_PERSONAL_DETAILS, schema);

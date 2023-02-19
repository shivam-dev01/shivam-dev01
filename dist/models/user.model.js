"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.Gender = exports.ApprovalState = exports.UserType = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var Helper_1 = require("../classes/Helper");
var connfiguration_model_1 = require("./connfiguration.model");
var UserType;
(function (UserType) {
    UserType["ROOT"] = "ROOT";
    UserType["ADMIN"] = "ADMIN";
    UserType["EMPLOYEE"] = "EMPLOYEE";
})(UserType = exports.UserType || (exports.UserType = {}));
var ApprovalState;
(function (ApprovalState) {
    ApprovalState["APPROVED"] = "APPROVED";
    ApprovalState["REJECTED"] = "REJECTED";
    ApprovalState["PENDING"] = "PENDING";
})(ApprovalState = exports.ApprovalState || (exports.ApprovalState = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["TRANSGENDER"] = "TRANSGENDER";
})(Gender = exports.Gender || (exports.Gender = {}));
var schema = new mongoose_1.Schema({
    fullName: { type: String, required: false },
    mobileNumber: { type: Number, required: false, unique: false },
    password: { type: String, required: false },
    ipAddress: { type: String, required: false },
    parent: { type: String, required: false },
    parentType: { type: String, required: false },
    location: { type: String, required: false },
    organizationName: { type: String, required: false },
    userType: { type: String, required: false, enum: UserType },
    department: { type: String, required: false, default: UserType.ADMIN },
    emailId: { type: String, required: false, unique: true },
    selectDocumentType: {
        type: String,
        required: false,
    },
    aadhaarNumber: {
        type: String,
        required: false,
    },
    jobRole: {
        type: String,
        required: false,
        default: UserType.ADMIN,
    },
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
    profileUpdate: {
        type: Boolean,
        required: false,
        default: null,
    },
    profileVerificationState: {
        type: Boolean,
        required: false,
        default: null,
    },
    gender: {
        type: String,
        required: false,
        enum: Gender,
    },
    DOB: {
        type: String,
        required: false,
    },
    panCardNumber: {
        type: String,
        required: false,
    },
    personalAddress: {
        type: Array,
        required: false,
    },
    alternateMobileNumber: {
        type: Number,
        required: false,
    },
    alternateEmailId: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true,
    },
    assignedShift: {
        type: String,
        required: false,
        enum: connfiguration_model_1.ShiftType,
        default: connfiguration_model_1.ShiftType.DAY_SHIFT,
    },
    profileImage: {
        type: String,
        required: false,
    },
    documents: {
        type: String,
        required: false,
    },
    isDelete: { type: Boolean, required: false, default: false },
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
schema.pre("save", function (next) {
    this.password = Helper_1.Helper.hashPassword(this.password);
    next();
});
schema.statics.activeUserById = function (id) {
    return this.where({ id: id, isDelete: false });
};
schema.static("activeUserById", function activeUserById(id) {
    console.log(id);
    return this.findById(id).where({ isDelete: false });
});
exports.UserSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.USERS, schema);

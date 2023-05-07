import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { ShiftType } from "./connfiguration.model";

export enum ApprovalState {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}
export interface empPersonalDetailsModel {
  fullName?: string;
  mobileNumber?: number;
  emailId?: string;
  gender?: string;
  DOB?: string;
  assignedShift?: string;
  selectDocumentType?: string;
  documentsNumber?: string;
  documents?: string;
  maritalStatus?: string;
  department?: string;
  jobRole?: string;
  organizationName?: string;
  bankName?: string;
  accountNumber?: number;
  ifscCode?: string;
  branchName?: string;
  guardianName?: string;
  guardianMobileNumber?: number;
  alternateGuardianName?: string;
  alternateGuardianMobileNumber?: number;
  educationDetails?: any;
  educationDetails1?: any;
  educationDetails2?: any;
  educationDetails3: any;
  permanentAddress?: any;
  currentAddress?: any;
  // aadhaarNumber?: number;
  // panCardNumber?: string;
  // passportNumber?: string;
  approvalState?: string;
  remark?: string;
  employeeId?: string;
  profileImage?: string;
  isActive?: boolean;
  isDelete?: boolean;
  accountHolderName?: string;
  accountHolderName1?: string;
  bankName1?: string;
  accountNumber1?: number;
  ifscCode1?: string;
  branchName1?: string;
  accountHolderName2?: string;
  bankName2?: string;
  accountNumber2?: number;
  ifscCode2?: string;
  branchName2?: string;
  bloodGroup?: string;
}
const schema = new Schema<empPersonalDetailsModel>(
  {
    fullName: { type: String, required: false },
    mobileNumber: { type: Number, required: false },
    emailId: { type: String, required: false },
    gender: { type: String, required: false },
    DOB: { type: String, required: false },
    maritalStatus: { type: String, required: false },
    department: { type: String, required: false },
    jobRole: { type: String, required: false },
    organizationName: { type: String, required: false },
    bankName: { type: String, required: false },
    accountNumber: { type: Number, required: false },
    ifscCode: { type: String, required: false },
    branchName: { type: String, required: false },
    guardianName: { type: String, required: false },
    guardianMobileNumber: { type: Number, required: false },
    alternateGuardianName: { type: String, required: false },
    alternateGuardianMobileNumber: { type: Number, required: false },
    educationDetails: { type: Array, required: false },
    educationDetails1: { type: Array, required: false },
    educationDetails2: { type: Array, required: false },
    educationDetails3: { type: Array, required: false },
    permanentAddress: { type: Array, required: false },
    currentAddress: { type: Array, required: false },
    // aadhaarNumber: { type: Number, required: false },
    // panCardNumber: { type: String, required: false },
    // passportNumber: { type: String, required: false },
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
    assignedShift: {
      type: String,
      required: false,
      enum: ShiftType,
      default: ShiftType.DAY_SHIFT,
    },
    selectDocumentType: {
      type: String,
      required: false,
    },
    documentsNumber: { type: String, required: false },
    documents: {
      type: String,
      required: false,
    },
    employeeId: {
      type: String,
      required: false,
      default: null,
    },
    profileImage: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    accountHolderName: { type: String, required: false },
    accountHolderName1: { type: String, required: false },
    bankName1: { type: String, required: false },
    ifscCode1: { type: String, required: false },
    accountNumber1: { type: Number, required: false },
    branchName1: { type: String, required: false },
    accountHolderName2: { type: String, required: false },
    bankName2: { type: String, required: false },
    ifscCode2: { type: String, required: false },
    accountNumber2: { type: Number, required: false },
    branchName2: { type: String, required: false },
    bloodGroup: { type: String, required: false },
  },
  {
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
  }
);
export const empPersonalDetailsSchema = model<empPersonalDetailsModel>(
  IDatabaseSchema.EMP_PERSONAL_DETAILS,
  schema
);

import mongoose, { Model, model, ObjectId, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { Helper } from "../classes/Helper";
import { ShiftType } from "./connfiguration.model";

export enum UserType {
  ROOT = "ROOT",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export enum ApprovalState {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  TRANSGENDER = "TRANSGENDER",
}

interface UserStatics {
  activeUserById(id: Schema.Types.ObjectId): UserModel;
}

export interface UserModel {
  fullName?: string;
  mobileNumber?: number;
  password?: string;
  ipAddress?: string;
  parent?: string;
  parentType?: string;
  location?: string;
  organizationName?: string;
  userType?: string;
  department?: string;
  emailId?: string;
  selectDocumentType?: string;
  documentsNumber?: string;
  aadhaarNumber?: string;
  jobRole?: string;
  approvalState?: string;
  remark?: string;
  employeeId?: string;
  profileUpdate?: boolean;
  profileVerificationState?: boolean;
  gender?: string;
  DOB?: string;
  panCardNumber?: string;
  personalAddress?: any;
  alternateMobileNumber?: number;
  alternateEmailId?: string;
  assignedShift?: string;
  profileImage?: string;
  documents?: string;
  isActive?: boolean;
  isDelete?: boolean;
  isRootUser?: boolean;
  salarySlab?: Schema.Types.ObjectId;
  dateOfJoining?: string;
}

interface UserStatics extends Model<UserModel> {
  activeUserById(): UserModel;
}

const schema = new Schema<UserModel, UserStatics>(
  {
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
    documentsNumber: { type: String, required: false },
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
      enum: ShiftType,
      default: ShiftType.DAY_SHIFT,
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
    salarySlab: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: IDatabaseSchema.SALARY_SLAB,
    },
    dateOfJoining: { type: String, required: false },
  },
  {
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
  }
);

schema.pre("save", function (next) {
  this.password = Helper.hashPassword(this.password);
  next();
});

schema.statics.activeUserById = function (id) {
  return this.where({ id, isDelete: false });
};

schema.static("activeUserById", function activeUserById(id) {
  console.log(id);
  return this.findById(id).where({ isDelete: false });
});

export const UserSchema = model<UserModel, UserStatics>(
  IDatabaseSchema.USERS,
  schema
);

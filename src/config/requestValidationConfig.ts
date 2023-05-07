import { Messages } from "../constants/Messages";
import { body, CustomValidator, param, query } from "express-validator";
import { Gender, UserSchema, UserType } from "../models/user.model";
import { PRESIGNED_URL_TYPE } from "../classes/CloudStorage";
import { TaskStatus } from "../models/taskTransition.model";
import { TaskSchema } from "../models/task.model";
import { ProjectSchema } from "../models/project.model";
import { CompanySchema } from "../models/company.model";
import { AttendanceType } from "../models/attendance.model";
import { organizationSchema } from "../models/organization.model";
import {
  ApprovalState,
  empPersonalDetailsSchema,
} from "../models/empPersonalDetails.model";
import { NextFunction } from "express";
import { ShiftType, WeekOffDays } from "../models/connfiguration.model";
import moment from "moment";
import { LeaveApprovalState } from "../models/leave.model";
import {
  PaymentStatus,
  Status,
  TransactionType,
} from "../models/expense-model";
import { SalarySlipStatus } from "../models/employees-monthly-report.model";
const userExists: CustomValidator = (value) => {
  console.log(value);
  return UserSchema.find({ mobileNumber: value }).then((user) => {
    console.log("-=-=-=-=----=-=-=-=-=-=-==-", user);
    if (user && user.length === 0) {
      return Promise.reject("User is not registered.");
    } else if (user[0].isDelete) {
      return Promise.reject("User is deactivated.");
    }
  });
};

const projectNameAlreadyExistExcept: CustomValidator = (value, { req }) => {
  return ProjectSchema.find({
    _id: { $ne: req.params.projectId },
    projectName: value,
  }).then((user) => {
    console.log(user);
    if (user && user.length) {
      return Promise.reject("Project already exists.");
    }
  });
};

const taskNameExists: CustomValidator = (value) => {
  return TaskSchema.find({ taskName: value }).then((task) => {
    if (task && task.length) {
      return Promise.reject("Task already exists.");
    }
  });
};

const companyExist: CustomValidator = (value) => {
  return CompanySchema.find({ companyName: value }).then((name) => {
    if (name && name.length) {
      return Promise.reject("Company already registered.");
    }
  });
};

const aliasExist: CustomValidator = (value) => {
  return CompanySchema.find({ companyAlias: value }).then((name) => {
    if (name && name.length) {
      return Promise.reject("Company already registered.");
    }
  });
};

const mobileExist: CustomValidator = (value) => {
  return UserSchema.find({ mobileNumber: value }).then((value) => {
    if (value && value.length) {
      return Promise.reject("Mobile number already exists.");
    }
  });
};

const empMobileExist: CustomValidator = (value) => {
  return empPersonalDetailsSchema
    .find({ mobileNumber: value })
    .then((value) => {
      if (value && value.length) {
        return Promise.reject("Mobile number already exists.");
      }
    });
};

const empEmailExist: CustomValidator = (value) => {
  return empPersonalDetailsSchema.find({ emailId: value }).then((value) => {
    if (value && value.length) {
      return Promise.reject("Email id already exists.");
    }
  });
};

const mobileExistOrg: CustomValidator = (value) => {
  return organizationSchema
    .find({ officialMobileNumber: value })
    .then((value) => {
      if (value && value.length) {
        return Promise.reject("Mobile number already exists.");
      }
    });
};

const emailExistOrg: CustomValidator = (value) => {
  return organizationSchema.find({ businessEmail: value }).then((value) => {
    if (value && value.length) {
      return Promise.reject("Email id already exists.");
    }
  });
};

const emailExist: CustomValidator = (value) => {
  return UserSchema.find({ emailId: value }).then((value) => {
    if (value && value.length) {
      return Promise.reject("Email id already exists.");
    }
  });
};

const aadhaarExist: CustomValidator = (value) => {
  return UserSchema.find({ aadhaarNumber: value }).then((value) => {
    if (value && value.length) {
      return Promise.reject("Aadhaar number already exists.");
    }
  });
};

const projectNameExists: CustomValidator = (value) => {
  return ProjectSchema.find({ projectName: value }).then((project) => {
    if (project && project.length) {
      return Promise.reject("Project already exists.");
    }
  });
};

const taskStatusIsIn = [
  TaskStatus.CREATED,
  TaskStatus.PLANNED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
  TaskStatus.VERIFIED,
];

const taskIdShouldExists: CustomValidator = (taskId) => {
  return TaskSchema.findById(taskId).then((task) => {
    if (!task) {
      return Promise.reject("Task does not exist.");
    }
  });
};

const mobileAlreadyExist: CustomValidator = (value) => {
  return UserSchema.find({ mobileNumber: value }).then((mobileNumber) => {
    if (mobileNumber && mobileNumber.length) {
      return Promise.reject("Mobile number already exists.");
    }
  });
};

export const requestValidationConfig = {
  login: [
    body("mobileNumber", "Invalid mobile number")
      .isLength({ min: 10, max: 10 })
      .custom(userExists),
    body("password").isLength({ min: 6 }),
    body("companyAlias").exists(),
  ],

  employerRegister: [
    body("fullName", "Please enter valid name").exists(),
    body("mobileNumber", "Provide a valid mobile number")
      .isLength({ min: 10, max: 10 })
      .custom(mobileAlreadyExist),
    body(
      "password",
      "Password should be minimum 6 characters and maximum 15 characters"
    )
      .exists()
      .isLength({ min: 6, max: 30 }),
    body("ipAddress").exists(),
    body("parent").exists(),
    body("parentType").exists(),
    body("location").exists(),
    body("organizationName").exists(),
    body("userType").exists(),
    body("departmentName").exists(),
  ],

  sendOtp: [
    body("mobileNumber").isLength({ min: 10, max: 10 }).custom(userExists),
  ],

  verifyOtp: [
    body("sessionId").exists(),
    body("otpValue").isLength({ max: 6 }).exists(),
    // body("mobileNumber")
    //   .isLength({ min: 10, max: 10 })
    //   .exists()
    //   .custom(userExists),
    // body("password").isLength({ min: 6, max: 15 }),
  ],

  resetPassword: [
    body("mobileNumber")
      .isLength({ min: 10, max: 10 })
      .exists()
      .custom(userExists),
    body("password").isLength({ min: 6, max: 15 }),
    body("otpValue").exists(),
    body("sessionId").exists(),
  ],

  changePassword: [
    param("id").isMongoId(),
    body("newPassword").isLength({ min: 6, max: 15 }).exists(),
    body("oldPassword").exists(),
  ],
  // Configuration employee id
  configureEmployeeId: [
    body("employeeId")
      .exists()
      .isLength({ min: 2, max: 2 })
      .isAlphanumeric()
      .isUppercase()
      .matches("^[A-Z0-9]*$")
      .withMessage("Only numeric and alphabet is allowed."),
  ],
  configureUpdateEmployeeId: [
    param("id").isMongoId(),
    body("employeeId").exists(),
  ],

  configureAttendanceTiming: [
    body("officeInStartTime").exists(),
    body("officeInEndTime").exists(),
    body("officeOutStartTime").exists(),
    body("officeOutEndTime").exists(),
    body("weekOff")
      .isIn([
        WeekOffDays.SUNDAY,
        WeekOffDays.MONDAY,
        WeekOffDays.TUESDAY,
        WeekOffDays.WEDNESDAY,
        WeekOffDays.THURSDAY,
        WeekOffDays.FRIDAY,
        WeekOffDays.SATURDAY,
      ])
      .exists()
      .isArray(),
    body("shiftType")
      .exists()
      .isIn([ShiftType.DAY_SHIFT, ShiftType.NIGHT_SHIFT]),
  ],
  configureUpdateAttendanceTiming: [
    param("id").isMongoId(),
    body("officeInStartTime").exists(),
    body("officeInEndTime").exists(),
    body("officeOutStartTime").exists(),
    body("officeOutEndTime").exists(),
    body("weekOff")
      .isIn([
        WeekOffDays.SUNDAY,
        WeekOffDays.MONDAY,
        WeekOffDays.TUESDAY,
        WeekOffDays.WEDNESDAY,
        WeekOffDays.THURSDAY,
        WeekOffDays.FRIDAY,
        WeekOffDays.SATURDAY,
      ])
      .exists()
      .isArray(),
  ],
  loginInfo: [
    body("fullName").exists(),
    body("mobileNumber").exists().isNumeric(),
    body("employeeId").optional(),
    body("loginInTime").exists(),
    body("logoutTime").exists(),
    body("ipAddress").isIP().exists(),
    body("location").exists(),
    body("deviceId").exists(),
  ],
  addDepartment: [
    body("department")
      .exists()
      .matches("[a-zA-Z]$")
      .withMessage("Only alphabet is allowed."),
  ],
  updateDepartment: [param("id").isMongoId(), body("department").exists()],
  deleteDepartment: [param("id").isMongoId()],
  addJobRole: [
    body("jobRole")
      .exists()
      .matches("[a-zA-Z]$")
      .withMessage("Only alphabet is allowed."),
    body("departmentId").isMongoId(),
  ],
  updateJobRole: [
    param("id").isMongoId(),
    body("jobRole").exists(),
    body("departmentId").isMongoId(),
  ],
  deleteJobRole: [param("id").isMongoId()],
  adminSaveDepartment: [body("departmentId").exists().isArray()],
  adminUpdateDepartment: [
    param("id").isMongoId(),
    body("departmentId").exists().isArray(),
  ],

  configureAdminDetails: [
    body("fullName").exists(),
    body("mobileNumber").exists().isLength({ min: 10, max: 10 }),
    body("alternateMobileNumber").exists().isLength({ min: 10, max: 10 }),
    body("emailId").exists(),
    body("aadhaarNumber").exists(),
    body("personalAddress").exists(),
    body("organisationName").exists(),
    body("desigination").exists(),
    body("organisationType").exists(),
    body("officialPhoneNumber").exists().isLength({ min: 10, max: 10 }),
    body("businessWebsite").exists(),
    body("businessEmail").exists(),
    body("businessPanNumber").exists(),
    body("gstNumber").exists(),
    body("organisationAddress").exists(),
  ],

  configureUpdateAdminDetails: [
    param("id").isMongoId(),
    body("fullName").exists(),
    body("mobileNumber").exists().isLength({ min: 10, max: 10 }),
    body("alternateMobileNumber").exists().isLength({ min: 10, max: 10 }),
    body("emailId").exists(),
    body("aadhaarNumber").exists(),
    body("personalAddress").exists(),
    body("organisationName").exists(),
    body("desigination").exists(),
    body("organisationType").exists(),
    body("officialPhoneNumber").exists().isLength({ min: 10, max: 10 }),
    body("businessWebsite").exists(),
    body("businessEmail").exists(),
    body("businessPanNumber").exists(),
    body("gstNumber").exists(),
    body("organisationAddress").exists(),
  ],
  updateEmployeeDetails: [
    param("id").isMongoId().exists(),
    body("fullName").isString().optional(),
    body("emailId").isEmail().optional(),
    body("department").isString().optional(),
    body("selectDocumentType").isString().optional(),
    body("documentsNumber").isString().optional(),
    body("mobileNumber").isLength({ min: 10, max: 10 }).optional(),
    body("aadhaarNumber").isString().optional(),
    body("jobRole").isString().optional(),
    body("documents").isString().optional(),
    body("salarySlab").isMongoId().optional(),
  ],

  createEmployeeDetails: [
    body("fullName").exists(),
    body("emailId").exists().custom(emailExist),
    body("department").exists(),
    body("selectDocumentType").optional(),
    body("mobileNumber")
      .exists()
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .custom(mobileExist),
    body("documentsNumber").isLength({ min: 5, max: 16 }).optional(),
    // .custom(aadhaarExist),
    body("jobRole").exists(),
    body("employeeId").exists(),
    body("documents").isString().optional(),
  ],

  createInsight: [
    body("insightName").exists(),
    body("insightDescription").exists(),
    body("insightTypeId").isMongoId(),
  ],
  updateInsight: [
    body("insightName").exists(),
    body("insightDescription").exists(),
    body("insightTypeId").isMongoId(),
  ],
  deleteInsight: [param("id").isMongoId()],
  createInsightType: [body("insightType").exists()],
  updateInsightType: [param("id").isMongoId(), body("insightType").exists()],
  deleteInsightType: [param("id").isMongoId()],
  // addHoliday: [
  //   body("month").isString().exists(),
  //   body("year").isString().exists(),
  //   body("name").isString().exists(),
  //   body("date").exists(),
  //   body("description").isString().exists(),
  // ],

  removeHoliday: [param("id").isMongoId()],

  updateHoliday: [
    body("date").isString(),
    body("name").isString(),
    body("description").optional().isString(),
    param("id").isMongoId(),
  ],

  signedUrl: [
    query("fileName").isString(),
    query("actionType").isIn([
      PRESIGNED_URL_TYPE.READ,
      PRESIGNED_URL_TYPE.WRITE,
    ]),
  ],
  addTask: [
    body("deadlineDate").toDate(),
    body("taskName").isString().custom(taskNameExists),
    body("taskDescription").isString(),
    body("releaseNumber").isNumeric(),
    body("taskAssets").isArray().optional(),
  ],

  updateTask: [
    body("deadlineDate").toDate(),
    body("taskName").isString(),
    body("taskDescription").isString(),
    body("releaseNumber").isNumeric(),
    body("taskAssets").isArray(),
  ],

  updateTaskStatus: [
    body("deadlineDate").toDate(),
    body("taskName").isString().custom(taskNameExists),
    body("taskDescription").isString(),
    body("taskAssets").isArray(),
    body("taskStatus").isString(),
  ],
  getTasks: [
    body("taskStatus.*").optional({ checkFalsy: true }).isIn(taskStatusIsIn),
    body("assignedTo.*").optional({ checkFalsy: true }).isMongoId(),
    body("projectIdWithRelease").optional({ checkFalsy: true }).isObject(),
    body("deadlineDate").optional({ checkFalsy: true }).isString(),
  ],

  updateTaskTransition: [
    body("taskStatus").isIn(taskStatusIsIn),
    body("assignedTo").optional(),
    param("taskId").isString().custom(taskIdShouldExists),
  ],

  getEachProject: [param("projectId").isMongoId()],
  addProject: [
    body("projectName").isString().exists(),
    body("deadlineDate").isString().optional(),
    // body("releaseCount").isArray().optional(),
    body("projectDocuments").isString().optional(),
    body("projectDescription").isString().exists(),
    body("department").isString().optional(),
  ],

  updateProject: [
    param("projectId").isMongoId().exists(),
    body("projectName").isString().optional(),
    body("deadlineDate").isString().optional(),
    // body("releaseCount").isArray().optional(),
    body("projectDocuments").isString().optional(),
    body("projectDescription").isString().optional(),
    body("department").isMongoId().optional(),
  ],
  employeesInProject: [query("projectId").isString()],
  createView: [body("viewName").exists()],
  updateView: [body("viewId").exists(), body("viewName").exists()],
  deleteView: [body("viewId").exists()],
  createCompany: [
    body("companyName")
      .exists()
      .isString()
      .custom(companyExist)
      .isLength({ min: 3, max: 100 }),
    body("companyAlias").exists().isString().custom(aliasExist),
    body("fullName").exists().isString(),
    body("mobileNumber").isNumeric().exists().isLength({ min: 10, max: 10 }),
    body("password").isString().isLength({ min: 6, max: 15 }),
    body("ipAddress").exists().isString(),
    body("location").exists().isString(),
  ],
  updateCompany: [body("companyName").exists(), body("companyAlias").exists()],
  userStatus: [
    param("id").isMongoId(),
    param("mobileNumber").exists(),
    body("approvalState").isIn([
      ApprovalState.APPROVED,
      ApprovalState.REJECTED,
    ]),
    body("remark").isLength({ min: 15, max: 1000 }).optional(),
  ],
  getOneEmployeeDetails: [param("userId").isMongoId()],
  employeeStatus: [
    param("id").isMongoId(),
    body("status").exists().isBoolean(),
  ],

  markAttendance: [
    body("userId").isMongoId().exists(),
    body("attendanceType").isIn([AttendanceType.IN, AttendanceType.OUT]),
    body("workReport").isString().isLength({ min: 300, max: 1000 }).optional(),
    body("todaysWork").isString().isLength({ min: 20, max: 1000 }).optional(),
  ],
  organizationDetails: [
    body("adminName").exists().isString(),
    body("mobileNumber").exists().isNumeric(),
    body("organizationName").exists().isString(),
    body("designation").exists().isString().isLength({ min: 3, max: 50 }),
    body("organizationType").exists().isString().isLength({ min: 3, max: 50 }),
    body("officialMobileNumber")
      .exists()
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .custom(mobileExistOrg),
    body("businessWebsite").optional(),
    body("businessPanCardNumber").optional(),
    body("gstNumber").exists().isString().isLength({ min: 3, max: 50 }),
    body("organizationAddress")
      .exists()
      .isString()
      .isLength({ min: 3, max: 100 }),
    body("businessEmail")
      .exists()
      .isEmail()
      .isLength({ min: 3, max: 50 })
      .custom(emailExistOrg),
  ],
  // empPersonalDetails: [
  //   body("fullName").exists().isLength({ min: 3, max: 20 }),
  //   body("mobileNumber")
  //     .exists()
  //     .isNumeric()
  //     .isLength({ min: 10, max: 10 })
  //     .custom(empMobileExist),
  //   body("emailId").exists().isEmail().custom(empEmailExist),
  //   body("gender").exists(),
  //   body("DOB").exists(),
  //   body("maritalStatus").exists(),
  //   body("department").exists(),
  //   body("jobRole").exists(),
  //   body("organizationName").exists(),
  //   body("bankName").exists().isString().isLength({ min: 3, max: 50 }),
  //   body("accountNumber").exists().isNumeric().isLength({ min: 8, max: 20 }),
  //   body("ifscCode").exists().isString().isLength({ min: 11, max: 11 }),
  //   body("branchName").exists().isString().isLength({ min: 3, max: 15 }),
  //   body("guardianName").exists().isString().isLength({ min: 3, max: 15 }),
  //   body("guardianMobileNumber")
  //     .exists()
  //     .isLength({ min: 10, max: 10 })
  //     .isNumeric(),
  //   body("alternateGuardianName").isString().optional(),
  //   body("alternateGuardianMobileNumber").optional(),
  //   body("educationDetails").exists().isArray(),
  //   body("permanentAddress").exists().isArray(),
  //   body("currentAddress").exists().isArray(),
  //   body("aadhaarNumber").isNumeric().isLength({ min: 12, max: 16 }).optional(),
  //   body("panCardNumber")
  //     .isString()
  //     .isLength({ min: 10, max: 10 })
  //     .isAlphanumeric()
  //     .optional(),
  //   body("passportNumber").isString().optional(),
  //   body("profileImage").optional(),
  // ],

  empUpdatePersonalDetails: [
    param("id").isMongoId().exists(),
    body("fullName").isLength({ min: 3, max: 20 }).optional(),
    body("mobileNumber").isNumeric().isLength({ min: 10, max: 10 }).optional(),
    body("emailId").isEmail().optional(),
    body("gender").isString().optional(),
    body("DOB").isString().optional(),
    body("maritalStatus").isString().optional(),
    body("department").isString().optional(),
    body("jobRole").isString().optional(),
    body("organizationName").isString().optional(),
    body("bankName").isString().isLength({ min: 3, max: 50 }).optional(),
    body("accountHolderName").isString().optional(),
    body("accountNumber").isNumeric().isLength({ min: 8, max: 20 }).optional(),
    body("ifscCode").isString().isLength({ min: 11, max: 11 }).optional(),
    body("branchName").isString().isLength({ min: 3, max: 15 }).optional(),
    body("guardianName").isString().isLength({ min: 3, max: 15 }).optional(),
    body("guardianMobileNumber")
      .isLength({ min: 10, max: 10 })
      .isNumeric()
      .optional(),
    body("alternateGuardianName").isString().optional(),
    body("alternateGuardianMobileNumber").optional(),
    body("educationDetails").isArray().optional(),
    body("educationDetails1").isArray().optional(),
    body("educationDetails2").isArray().optional(),
    body("educationDetails3").isArray().optional(),
    body("permanentAddress").isArray().optional(),
    body("currentAddress").isArray().optional(),
    // body("aadhaarNumber").isNumeric().isLength({ min: 12, max: 12 }).optional(),
    // body("panCardNumber")
    //   .isString()
    //   .isLength({ min: 10, max: 10 })
    //   .isAlphanumeric()
    //   .optional(),
    // body("passportNumber").isString().optional(),
    body("profileImage").optional(),
    body("selectDocumentType").isString().optional(),
    body("documentsNumber").isString().optional(),
    body("documents").optional(),
    body("bloodGroup").isString().optional(),
    body("accountHolderName1").isString().optional(),
    body("bankName1").isString().optional(),
    body("accountNumber1").isNumeric().isLength({ min: 8, max: 20 }).optional(),
    body("ifscCode1").isString().isLength({ min: 11, max: 11 }).optional(),
    body("branchName1").isString().isLength({ min: 3, max: 15 }).optional(),
    body("accountHolderName2").isString().optional(),
    body("bankName2").isString().optional(),
    body("accountNumber2").isNumeric().isLength({ min: 8, max: 20 }).optional(),
    body("ifscCode2").isString().isLength({ min: 11, max: 11 }).optional(),
    body("branchName2").isString().isLength({ min: 3, max: 15 }).optional(),
  ],
  empGetSpecifiedPersonalDetails: [param("mobileNumber").exists()],
  updateAdminProfile: [
    param("id").isMongoId(),
    body("gender")
      .exists()
      .isIn([Gender.FEMALE, Gender.MALE, Gender.TRANSGENDER]),
    body("emailId").exists().isEmail(),
    body("aadhaarNumber").exists().isLength({ min: 12, max: 12 }),
    body("DOB").exists(),
    body("panCardNumber").optional(),
    body("personalAddress").exists().isArray(),
    body("alternateMobileNumber")
      .optional()
      .isLength({ min: 10, max: 10 })
      .isNumeric(),
    body("alternateEmailId").optional().isEmail(),
  ],

  getJobRole: [param("id").isMongoId()],
  getLastLoginTime: [param("mobileNumber").exists()],
  assignShift: [
    param("id").isMongoId(),
    body("assignShift")
      .isIn([ShiftType.DAY_SHIFT, ShiftType.NIGHT_SHIFT])
      .exists()
      .isString(),
  ],

  getSingleReport: [param("id").isMongoId()],
  getCustomReport: [
    query("department").optional(),
    query("date").optional(),
    query("page").optional(),
    query("limit").optional(),
  ],
  getCustomEmployeeList: [query("page").optional(), query("limit").optional()],

  filteredEmployee: [
    query("assignedShift")
      .isIn([ShiftType.DAY_SHIFT, ShiftType.NIGHT_SHIFT])
      .optional(),
    query("department").optional(),
    query("jobRole").optional(),
  ],
  applyLeave: [
    body("userId").isMongoId().exists(),
    body("fromDate").isString().exists(),
    body("toDate").isString().exists(),
    body("subject").isString().exists(),
    body("description").isString().exists(),
  ],
  getHolidayList: [query("month").optional(), query("year").optional()],
  updateLeave: [
    body("leaveApprovalState")
      .exists()
      .isIn([
        LeaveApprovalState.APPROVED,
        LeaveApprovalState.REJECTED,
        LeaveApprovalState.CANCELED,
      ]),
    param("id").isMongoId(),
    body("remark").isString().optional().isLength({ min: 15, max: 1000 }),
  ],
  getLeaveRequestList: [
    query("userId").optional(),
    query("page").optional(),
    query("limit").optional(),
  ],
  adminLeaveRequestList: [query("page").optional(), query("limit").optional()],
  adminGetSeparateLeaveRequestList: [param("id").isMongoId()],
  employeeAttendanceReport: [
    query("userId").exists(),
    query("page").optional(),
    query("limit").optional(),
  ],
  leaveSearch: [query("text").optional()],
  searchEmployee: [query("text").optional()],
  searchAttendance: [query("text").optional()],
  employeeSearchAttendance: [
    query("userId").exists(),
    query("text").optional(),
  ],
  employeeLeaveSearch: [query("userId").exists(), query("text").optional()],
  uploadImage: [
    param("id").isMongoId(),
    body("profileImage").exists().isString(),
  ],
  getAttendanceReport: [
    query("userId").exists(),
    query("page").optional(),
    query("limit").optional(),
  ],
  attendanceReport: [query("page").optional(), query("limit").optional()],
  monthlyYearlyAttendanceReport: [
    query("userId").exists(),
    query("month").optional(),
    query("year").optional(),
  ],
  monthlyYearlyCompleteReport: [
    query("userId").exists(),
    query("month").optional(),
    query("year").optional(),
  ],
  addExpenses: [
    body("userId").exists(),
    body("userType").isString().isIn([UserType.ROOT, UserType.EMPLOYEE]),
    body("date").exists(),
    body("amount").exists().isNumeric(),
    body("description").exists().isString(),
    body("attachment").optional(),
  ],

  updateExpenses: [
    param("id").isMongoId(),
    body("date").exists(),
    body("amount").exists().isNumeric(),
    body("description").exists().isString(),
    body("attachment").exists(),
  ],
  deleteExpenses: [param("id").isMongoId()],
  expensesLists: [
    query("userType").optional(),
    query("CREDIT").optional(),
    query("userId").isMongoId().optional(),
  ],
  updateExpenseStatus: [
    param("id").isMongoId(),
    body("status").isIn([Status.APPROVED, Status.REJECTED]),
    body("remark").isLength({ min: 15, max: 1000 }).optional(),
  ],

  expensePaymentStatus: [
    param("id").isMongoId(),
    body("transactionType").isString().exists().isIn([TransactionType.ONLINE]),
    // body("paymentStatus").isString().exists().isIn([PaymentStatus.CREDITED]),
    body("bankRRNNumber").isString().exists().isLength({ min: 10, max: 15 }),
    body("amountCreditedDate").isString().exists(),
  ],

  observerRemark: [
    param("id").isMongoId().exists(),
    body("remarkBy").isMongoId().exists(),
    body("observerRemark").exists().isString().isLength({ min: 2, max: 1000 }),
  ],
  removeObserverRemark: [param("id").isMongoId().exists()],
  employeeProfileDetails: [
    query("employeeId").optional(),
    query("ABOUT").optional(),
    query("ACCOUNT").optional(),
    query("ADDITIONAL").optional(),
  ],
  addSalarySlab: [
    body("slabName").isString().exists(),
    body("basicSalary").isNumeric().exists(),
    body("pfDeduction").isString().optional(),
    body("esiDeduction").isString().optional(),
    body("houseRentAllowance").isString().optional(),
    body("medicalAllowance").isString().optional(),
    body("travelAllowance").isString().optional(),
    body("foodReimbursement").isString().optional(),
    body("specialAllowance").isString().optional(),
    body("grossCompensation").isString().optional(),
    body("value1").isNumeric().optional(),
    body("value2").isNumeric().optional(),
    body("value3").isNumeric().optional(),
    body("value4").isNumeric().optional(),
    body("value5").isNumeric().optional(),
    // body("value6").isNumeric().exists().optional(),
    // body("value7").isNumeric().exists().optional(),
    // body("value8").isNumeric().exists().optional(),
    // body("value9").isNumeric().exists().optional(),
    // body("value10").isNumeric().exists().optional(),
    body("totalCompensation").isNumeric().exists(),
  ],
  updateSalarySlab: [
    param("id").isMongoId(),
    body("slabName").isString().optional(),
    body("basicSalary").isNumeric().optional(),
    body("pfDeduction").isString().optional(),
    body("esiDeduction").isString().optional(),
    body("houseRentAllowance").isString().optional(),
    body("medicalAllowance").isString().optional(),
    body("travelAllowance").isString().optional(),
    body("foodReimbursement").isString().optional(),
    body("specialAllowance").isString().optional(),
    body("grossCompensation").isString().optional(),
    body("value1").isNumeric().optional(),
    body("value2").isNumeric().optional(),
    body("value3").isNumeric().optional(),
    body("value4").isNumeric().optional(),
    body("value5").isNumeric().optional(),
    body("totalCompensation").isNumeric().optional(),
  ],
  deleteSalarySlab: [param("id").isMongoId()],
  generateMonthlyReport: [
    body("userId").isMongoId().exists(),
    body("monthlyReport").isString().exists(),
    body("month").isString().exists(),
  ],

  updatePaymentStatus: [
    // param("userId").isMongoId().exists(),
    param("id").isMongoId().exists(),
    body("paymentStatus").isString().isIn([PaymentStatus.CREDITED]).exists(),
    body("salaryCreditedDate").isString().exists(),
    body("bankRRNNumber").isString().exists(),
  ],

  generateSalarySlip: [
    param("id").isMongoId().exists(),
    body("salarySlip").isString().exists(),
  ],

  filterEmployee: [
    query("department").isString().optional(),
    query("jobRole").isString().optional(),
    query("employeeId").isString().optional(),
    query("page").optional(),
    query("limit").optional(),
  ],
  fetchSalarySlab: [
    query("userId").isMongoId().optional(),
    query("slabName").isString().optional(),
  ],
  filterLeaveRequests: [
    query("userId").isMongoId().optional(),
    query("status")
      .isString()
      .isIn([
        LeaveApprovalState.APPROVED,
        LeaveApprovalState.PENDING,
        LeaveApprovalState.REJECTED,
        LeaveApprovalState.CANCELED,
      ])
      .optional(),
  ],
  createTeam: [
    body("teamName").isString().isLength({ min: 3, max: 50 }).exists(),
    body("teamLead").isString().optional(),
    body("teamDepartment").isString().optional(),
    body("assignedProject").isArray().optional(),
    // body("anotherLeadMember").isString().isLength({ min: 3, max: 50 }).exists(),
    body("teamMember").isArray().optional(),
    body("teamDescription")
      .isString()
      .isLength({ min: 5, max: 500 })
      .optional(),
  ],
  updateTeam: [
    param("id").isMongoId().exists(),
    body("teamName").isString().isLength({ min: 3, max: 50 }).optional(),
    body("teamLead").isMongoId().optional(),
    body("teamDepartment").isString().optional(),
    body("assignedProject").isArray().optional(),
    // body("anotherLeadMember").isMongoId().optional(),
    body("teamMember").isArray().optional(),
    body("teamDescription")
      .isString()
      .isLength({ min: 5, max: 500 })
      .optional(),
  ],

  fetchTeam: [
    query("id").isMongoId().optional(),
    query("userId").isMongoId().optional(),
  ],
  deleteTeam: [param("id").isMongoId().exists()],

  filterExpense: [
    query("department").optional(),
    query("jobRole").optional(),
    query("billStatus")
      .isIn([Status.PENDING, Status.APPROVED, Status.REJECTED])
      .optional(),
    query("paymentStatus")
      .isIn([PaymentStatus.CREDITED, PaymentStatus.PENDING])
      .optional(),
    query("month").optional(),
    query("year").optional(),
  ],
  singleExpense: [param("id").isMongoId().exists()],
  fetchMonthlyReport: [query("userId").isMongoId().optional()],

  addPhase: [
    body("projectId").isMongoId().exists(),
    body("phaseName").isString().exists(),
    body("services").isString().optional(),
    body("description").isString().optional(),
    body("deadlineDate").isString().optional(),
    body("team").isArray().isMongoId().optional(),
    body("member").isArray().isMongoId().optional(),
    body("attachment").isString().optional(),
  ],
  updatePhase: [
    param("id").isMongoId().exists(),
    body("projectId").isMongoId().optional(),
    body("phaseName").isString().optional(),
    body("services").isString().optional(),
    body("description").isString().optional(),
    body("deadlineDate").isString().optional(),
    body("team").isMongoId().optional(),
    body("member").isMongoId().optional(),
    body("attachment").isString().optional(),
  ],

  deletePhase: [param("id").isMongoId().exists()],
  deleteProject: [param("id").isMongoId().exists()],
  projectList: [query("id").isMongoId().optional()],
  getPhase: [query("id").isMongoId().optional()],
  filterMonthlyReport: [
    query("userId").isMongoId().optional(),
    query("month").isString().optional(),
    query("year").isString().optional(),
    query("department").isString().optional(),
    query("jobRole").isString().optional(),
    query("employeeId").isString().optional(),
  ],
};

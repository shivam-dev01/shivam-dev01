"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidationConfig = void 0;
var express_validator_1 = require("express-validator");
var user_model_1 = require("../models/user.model");
var CloudStorage_1 = require("../classes/CloudStorage");
var taskTransition_model_1 = require("../models/taskTransition.model");
var task_model_1 = require("../models/task.model");
var project_model_1 = require("../models/project.model");
var company_model_1 = require("../models/company.model");
var attendance_model_1 = require("../models/attendance.model");
var organization_model_1 = require("../models/organization.model");
var empPersonalDetails_model_1 = require("../models/empPersonalDetails.model");
var connfiguration_model_1 = require("../models/connfiguration.model");
var leave_model_1 = require("../models/leave.model");
var userExists = function (value) {
    console.log(value);
    return user_model_1.UserSchema.find({ mobileNumber: value }).then(function (user) {
        console.log("-=-=-=-=----=-=-=-=-=-=-==-", user);
        if (user && user.length === 0) {
            return Promise.reject("User is not registered.");
        }
        else if (user[0].isDelete) {
            return Promise.reject("User is deactivated.");
        }
    });
};
var projectNameAlreadyExistExcept = function (value, _a) {
    var req = _a.req;
    return project_model_1.ProjectSchema.find({
        _id: { $ne: req.params.projectId },
        projectName: value,
    }).then(function (user) {
        console.log(user);
        if (user && user.length) {
            return Promise.reject("Project already exists.");
        }
    });
};
var taskNameExists = function (value) {
    return task_model_1.TaskSchema.find({ taskName: value }).then(function (task) {
        if (task && task.length) {
            return Promise.reject("Task already exists.");
        }
    });
};
var companyExist = function (value) {
    return company_model_1.CompanySchema.find({ companyName: value }).then(function (name) {
        if (name && name.length) {
            return Promise.reject("Company already registered.");
        }
    });
};
var aliasExist = function (value) {
    return company_model_1.CompanySchema.find({ companyAlias: value }).then(function (name) {
        if (name && name.length) {
            return Promise.reject("Company already registered.");
        }
    });
};
var mobileExist = function (value) {
    return user_model_1.UserSchema.find({ mobileNumber: value }).then(function (value) {
        if (value && value.length) {
            return Promise.reject("Mobile number already exists.");
        }
    });
};
var empMobileExist = function (value) {
    return empPersonalDetails_model_1.empPersonalDetailsSchema
        .find({ mobileNumber: value })
        .then(function (value) {
        if (value && value.length) {
            return Promise.reject("Mobile number already exists.");
        }
    });
};
var empEmailExist = function (value) {
    return empPersonalDetails_model_1.empPersonalDetailsSchema.find({ emailId: value }).then(function (value) {
        if (value && value.length) {
            return Promise.reject("Email id already exists.");
        }
    });
};
var mobileExistOrg = function (value) {
    return organization_model_1.organizationSchema
        .find({ officialMobileNumber: value })
        .then(function (value) {
        if (value && value.length) {
            return Promise.reject("Mobile number already exists.");
        }
    });
};
var emailExistOrg = function (value) {
    return organization_model_1.organizationSchema.find({ businessEmail: value }).then(function (value) {
        if (value && value.length) {
            return Promise.reject("Email id already exists.");
        }
    });
};
var emailExist = function (value) {
    return user_model_1.UserSchema.find({ emailId: value }).then(function (value) {
        if (value && value.length) {
            return Promise.reject("Email id already exists.");
        }
    });
};
var aadhaarExist = function (value) {
    return user_model_1.UserSchema.find({ aadhaarNumber: value }).then(function (value) {
        if (value && value.length) {
            return Promise.reject("Aadhaar number already exists.");
        }
    });
};
var projectNameExists = function (value) {
    return project_model_1.ProjectSchema.find({ projectName: value }).then(function (project) {
        if (project && project.length) {
            return Promise.reject("Project already exists.");
        }
    });
};
var taskStatusIsIn = [
    taskTransition_model_1.TaskStatus.CREATED,
    taskTransition_model_1.TaskStatus.PLANNED,
    taskTransition_model_1.TaskStatus.IN_PROGRESS,
    taskTransition_model_1.TaskStatus.COMPLETED,
    taskTransition_model_1.TaskStatus.VERIFIED,
];
var taskIdShouldExists = function (taskId) {
    return task_model_1.TaskSchema.findById(taskId).then(function (task) {
        if (!task) {
            return Promise.reject("Task does not exist.");
        }
    });
};
var mobileAlreadyExist = function (value) {
    return user_model_1.UserSchema.find({ mobileNumber: value }).then(function (mobileNumber) {
        if (mobileNumber && mobileNumber.length) {
            return Promise.reject("Mobile number already exists.");
        }
    });
};
exports.requestValidationConfig = {
    login: [
        (0, express_validator_1.body)("mobileNumber", "Invalid mobile number")
            .isLength({ min: 10, max: 10 })
            .custom(userExists),
        (0, express_validator_1.body)("password").isLength({ min: 6 }),
        (0, express_validator_1.body)("companyAlias").exists(),
    ],
    employerRegister: [
        (0, express_validator_1.body)("fullName", "Please enter valid name").exists(),
        (0, express_validator_1.body)("mobileNumber", "Provide a valid mobile number")
            .isLength({ min: 10, max: 10 })
            .custom(mobileAlreadyExist),
        (0, express_validator_1.body)("password", "Password should be minimum 6 characters and maximum 15 characters")
            .exists()
            .isLength({ min: 6, max: 30 }),
        (0, express_validator_1.body)("ipAddress").exists(),
        (0, express_validator_1.body)("parent").exists(),
        (0, express_validator_1.body)("parentType").exists(),
        (0, express_validator_1.body)("location").exists(),
        (0, express_validator_1.body)("organizationName").exists(),
        (0, express_validator_1.body)("userType").exists(),
        (0, express_validator_1.body)("departmentName").exists(),
    ],
    sendOtp: [
        (0, express_validator_1.body)("mobileNumber").isLength({ min: 10, max: 10 }).custom(userExists),
    ],
    verifyOtp: [
        (0, express_validator_1.body)("sessionId").exists(),
        (0, express_validator_1.body)("otpValue").isLength({ max: 6 }).exists(),
        // body("mobileNumber")
        //   .isLength({ min: 10, max: 10 })
        //   .exists()
        //   .custom(userExists),
        // body("password").isLength({ min: 6, max: 15 }),
    ],
    resetPassword: [
        (0, express_validator_1.body)("mobileNumber")
            .isLength({ min: 10, max: 10 })
            .exists()
            .custom(userExists),
        (0, express_validator_1.body)("password").isLength({ min: 6, max: 15 }),
        (0, express_validator_1.body)("otpValue").exists(),
        (0, express_validator_1.body)("sessionId").exists(),
    ],
    changePassword: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("newPassword").isLength({ min: 6, max: 15 }).exists(),
        (0, express_validator_1.body)("oldPassword").exists(),
    ],
    // Configuration employee id
    configureEmployeeId: [
        (0, express_validator_1.body)("employeeId")
            .exists()
            .isLength({ min: 2, max: 2 })
            .isAlphanumeric()
            .isUppercase()
            .matches("^[A-Z0-9]*$")
            .withMessage("Only numeric and alphabet is allowed."),
    ],
    configureUpdateEmployeeId: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("employeeId").exists(),
    ],
    configureAttendanceTiming: [
        (0, express_validator_1.body)("officeInStartTime").exists(),
        (0, express_validator_1.body)("officeInEndTime").exists(),
        (0, express_validator_1.body)("officeOutStartTime").exists(),
        (0, express_validator_1.body)("officeOutEndTime").exists(),
        (0, express_validator_1.body)("weekOff")
            .isIn([
            connfiguration_model_1.WeekOffDays.SUNDAY,
            connfiguration_model_1.WeekOffDays.MONDAY,
            connfiguration_model_1.WeekOffDays.TUESDAY,
            connfiguration_model_1.WeekOffDays.WEDNESDAY,
            connfiguration_model_1.WeekOffDays.THURSDAY,
            connfiguration_model_1.WeekOffDays.FRIDAY,
            connfiguration_model_1.WeekOffDays.SATURDAY,
        ])
            .exists()
            .isArray(),
        (0, express_validator_1.body)("shiftType")
            .exists()
            .isIn([connfiguration_model_1.ShiftType.DAY_SHIFT, connfiguration_model_1.ShiftType.NIGHT_SHIFT]),
    ],
    configureUpdateAttendanceTiming: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("officeInStartTime").exists(),
        (0, express_validator_1.body)("officeInEndTime").exists(),
        (0, express_validator_1.body)("officeOutStartTime").exists(),
        (0, express_validator_1.body)("officeOutEndTime").exists(),
        (0, express_validator_1.body)("weekOff")
            .isIn([
            connfiguration_model_1.WeekOffDays.SUNDAY,
            connfiguration_model_1.WeekOffDays.MONDAY,
            connfiguration_model_1.WeekOffDays.TUESDAY,
            connfiguration_model_1.WeekOffDays.WEDNESDAY,
            connfiguration_model_1.WeekOffDays.THURSDAY,
            connfiguration_model_1.WeekOffDays.FRIDAY,
            connfiguration_model_1.WeekOffDays.SATURDAY,
        ])
            .exists()
            .isArray(),
    ],
    loginInfo: [
        (0, express_validator_1.body)("fullName").exists(),
        (0, express_validator_1.body)("mobileNumber").exists().isNumeric(),
        (0, express_validator_1.body)("employeeId").optional(),
        (0, express_validator_1.body)("loginInTime").exists(),
        (0, express_validator_1.body)("logoutTime").exists(),
        (0, express_validator_1.body)("ipAddress").isIP().exists(),
        (0, express_validator_1.body)("location").exists(),
        (0, express_validator_1.body)("deviceId").exists(),
    ],
    addDepartment: [
        (0, express_validator_1.body)("department")
            .exists()
            .matches("[a-zA-Z]$")
            .withMessage("Only alphabet is allowed."),
    ],
    updateDepartment: [(0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.body)("department").exists()],
    deleteDepartment: [(0, express_validator_1.param)("id").isMongoId()],
    addJobRole: [
        (0, express_validator_1.body)("jobRole")
            .exists()
            .matches("[a-zA-Z]$")
            .withMessage("Only alphabet is allowed."),
        (0, express_validator_1.body)("departmentId").isMongoId(),
    ],
    updateJobRole: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("jobRole").exists(),
        (0, express_validator_1.body)("departmentId").isMongoId(),
    ],
    deleteJobRole: [(0, express_validator_1.param)("id").isMongoId()],
    adminSaveDepartment: [(0, express_validator_1.body)("departmentId").exists().isArray()],
    adminUpdateDepartment: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("departmentId").exists().isArray(),
    ],
    configureAdminDetails: [
        (0, express_validator_1.body)("fullName").exists(),
        (0, express_validator_1.body)("mobileNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("alternateMobileNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("emailId").exists(),
        (0, express_validator_1.body)("aadhaarNumber").exists(),
        (0, express_validator_1.body)("personalAddress").exists(),
        (0, express_validator_1.body)("organisationName").exists(),
        (0, express_validator_1.body)("desigination").exists(),
        (0, express_validator_1.body)("organisationType").exists(),
        (0, express_validator_1.body)("officialPhoneNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("businessWebsite").exists(),
        (0, express_validator_1.body)("businessEmail").exists(),
        (0, express_validator_1.body)("businessPanNumber").exists(),
        (0, express_validator_1.body)("gstNumber").exists(),
        (0, express_validator_1.body)("organisationAddress").exists(),
    ],
    configureUpdateAdminDetails: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("fullName").exists(),
        (0, express_validator_1.body)("mobileNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("alternateMobileNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("emailId").exists(),
        (0, express_validator_1.body)("aadhaarNumber").exists(),
        (0, express_validator_1.body)("personalAddress").exists(),
        (0, express_validator_1.body)("organisationName").exists(),
        (0, express_validator_1.body)("desigination").exists(),
        (0, express_validator_1.body)("organisationType").exists(),
        (0, express_validator_1.body)("officialPhoneNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("businessWebsite").exists(),
        (0, express_validator_1.body)("businessEmail").exists(),
        (0, express_validator_1.body)("businessPanNumber").exists(),
        (0, express_validator_1.body)("gstNumber").exists(),
        (0, express_validator_1.body)("organisationAddress").exists(),
    ],
    configureEmployeeUpdateDetails: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("fullName").exists(),
        (0, express_validator_1.body)("emailId").exists(),
        (0, express_validator_1.body)("selectDepartment").exists(),
        (0, express_validator_1.body)("selectDocumentType").exists(),
        (0, express_validator_1.body)("mobileNumber").exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("aadhaarNumber").exists(),
        (0, express_validator_1.body)("selectRole").exists(),
        (0, express_validator_1.body)("image").exists(),
    ],
    createEmployeeDetails: [
        (0, express_validator_1.body)("fullName").exists(),
        (0, express_validator_1.body)("emailId").exists().custom(emailExist),
        (0, express_validator_1.body)("department").exists(),
        (0, express_validator_1.body)("selectDocumentType").optional(),
        (0, express_validator_1.body)("mobileNumber")
            .exists()
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .custom(mobileExist),
        (0, express_validator_1.body)("aadhaarNumber")
            .exists()
            .isLength({ min: 12, max: 16 })
            .custom(aadhaarExist),
        (0, express_validator_1.body)("jobRole").exists(),
        (0, express_validator_1.body)("employeeId").exists(),
        (0, express_validator_1.body)("documents").isString().optional(),
    ],
    createInsight: [
        (0, express_validator_1.body)("insightName").exists(),
        (0, express_validator_1.body)("insightDescription").exists(),
        (0, express_validator_1.body)("insightTypeId").isMongoId(),
    ],
    updateInsight: [
        (0, express_validator_1.body)("insightName").exists(),
        (0, express_validator_1.body)("insightDescription").exists(),
        (0, express_validator_1.body)("insightTypeId").isMongoId(),
    ],
    deleteInsight: [(0, express_validator_1.param)("id").isMongoId()],
    createInsightType: [(0, express_validator_1.body)("insightType").exists()],
    updateInsightType: [(0, express_validator_1.param)("id").isMongoId(), (0, express_validator_1.body)("insightType").exists()],
    deleteInsightType: [(0, express_validator_1.param)("id").isMongoId()],
    // addHoliday: [
    //   body("month").isString().exists(),
    //   body("year").isString().exists(),
    //   body("name").isString().exists(),
    //   body("date").exists(),
    //   body("description").isString().exists(),
    // ],
    removeHoliday: [(0, express_validator_1.param)("id").isMongoId()],
    updateHoliday: [
        (0, express_validator_1.body)("date").isString(),
        (0, express_validator_1.body)("name").isString(),
        (0, express_validator_1.body)("description").optional().isString(),
        (0, express_validator_1.param)("id").isMongoId(),
    ],
    signedUrl: [
        (0, express_validator_1.query)("fileName").isString(),
        (0, express_validator_1.query)("actionType").isIn([
            CloudStorage_1.PRESIGNED_URL_TYPE.READ,
            CloudStorage_1.PRESIGNED_URL_TYPE.WRITE,
        ]),
    ],
    addTask: [
        (0, express_validator_1.body)("deadlineDate").toDate(),
        (0, express_validator_1.body)("taskName").isString().custom(taskNameExists),
        (0, express_validator_1.body)("taskDescription").isString(),
        (0, express_validator_1.body)("releaseNumber").isNumeric(),
        (0, express_validator_1.body)("taskAssets").isArray().optional(),
    ],
    updateTask: [
        (0, express_validator_1.body)("deadlineDate").toDate(),
        (0, express_validator_1.body)("taskName").isString(),
        (0, express_validator_1.body)("taskDescription").isString(),
        (0, express_validator_1.body)("releaseNumber").isNumeric(),
        (0, express_validator_1.body)("taskAssets").isArray(),
    ],
    updateTaskStatus: [
        (0, express_validator_1.body)("deadlineDate").toDate(),
        (0, express_validator_1.body)("taskName").isString().custom(taskNameExists),
        (0, express_validator_1.body)("taskDescription").isString(),
        (0, express_validator_1.body)("taskAssets").isArray(),
        (0, express_validator_1.body)("taskStatus").isString(),
    ],
    getTasks: [
        (0, express_validator_1.body)("taskStatus.*").optional({ checkFalsy: true }).isIn(taskStatusIsIn),
        (0, express_validator_1.body)("assignedTo.*").optional({ checkFalsy: true }).isMongoId(),
        (0, express_validator_1.body)("projectIdWithRelease").optional({ checkFalsy: true }).isObject(),
        (0, express_validator_1.body)("deadlineDate").optional({ checkFalsy: true }).isString(),
    ],
    updateTaskTransition: [
        (0, express_validator_1.body)("taskStatus").isIn(taskStatusIsIn),
        (0, express_validator_1.body)("assignedTo").optional(),
        (0, express_validator_1.param)("taskId").isString().custom(taskIdShouldExists),
    ],
    getEachProject: [(0, express_validator_1.param)("projectId").isMongoId()],
    addProject: [
        (0, express_validator_1.body)("deadlineDate").toDate(),
        (0, express_validator_1.body)("projectName").isString().custom(projectNameExists),
        (0, express_validator_1.body)("releaseCount").isNumeric(),
        (0, express_validator_1.body)("projectImagePath").isString().optional(),
        (0, express_validator_1.body)("projectDescription").isString(),
        (0, express_validator_1.body)("employees").isArray().exists(),
    ],
    updateProject: [
        (0, express_validator_1.param)("projectId").isMongoId(),
        (0, express_validator_1.body)("deadlineDate").toDate(),
        (0, express_validator_1.body)("projectName").isString().custom(projectNameAlreadyExistExcept),
        (0, express_validator_1.body)("releaseCount").isNumeric(),
        (0, express_validator_1.body)("projectImagePath").isString().optional(),
        (0, express_validator_1.body)("projectDescription").isString(),
        (0, express_validator_1.body)("employees").isArray().exists(),
    ],
    employeesInProject: [(0, express_validator_1.query)("projectId").isString()],
    createView: [(0, express_validator_1.body)("viewName").exists()],
    updateView: [(0, express_validator_1.body)("viewId").exists(), (0, express_validator_1.body)("viewName").exists()],
    deleteView: [(0, express_validator_1.body)("viewId").exists()],
    createCompany: [
        (0, express_validator_1.body)("companyName")
            .exists()
            .isString()
            .custom(companyExist)
            .isLength({ min: 3, max: 100 }),
        (0, express_validator_1.body)("companyAlias").exists().isString().custom(aliasExist),
        (0, express_validator_1.body)("fullName").exists().isString(),
        (0, express_validator_1.body)("mobileNumber").isNumeric().exists().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("password").isString().isLength({ min: 6, max: 15 }),
        (0, express_validator_1.body)("ipAddress").exists().isString(),
        (0, express_validator_1.body)("location").exists().isString(),
    ],
    updateCompany: [(0, express_validator_1.body)("companyName").exists(), (0, express_validator_1.body)("companyAlias").exists()],
    userStatus: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.param)("mobileNumber").exists(),
        (0, express_validator_1.body)("approvalState").isIn([
            empPersonalDetails_model_1.ApprovalState.APPROVED,
            empPersonalDetails_model_1.ApprovalState.REJECTED,
        ]),
        (0, express_validator_1.body)("remark").optional(),
    ],
    getOneEmployeeDetails: [(0, express_validator_1.param)("userId").isMongoId()],
    employeeStatus: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("status").exists().isBoolean(),
    ],
    markAttendance: [
        (0, express_validator_1.body)("userId").isMongoId().exists(),
        (0, express_validator_1.body)("attendanceType").isIn([attendance_model_1.AttendanceType.IN, attendance_model_1.AttendanceType.OUT]),
        (0, express_validator_1.body)("workReport").isString().isLength({ min: 0, max: 1000 }).optional(),
    ],
    organizationDetails: [
        (0, express_validator_1.body)("adminName").exists().isString(),
        (0, express_validator_1.body)("mobileNumber").exists().isNumeric(),
        (0, express_validator_1.body)("organizationName").exists().isString(),
        (0, express_validator_1.body)("designation").exists().isString().isLength({ min: 3, max: 50 }),
        (0, express_validator_1.body)("organizationType").exists().isString().isLength({ min: 3, max: 50 }),
        (0, express_validator_1.body)("officialMobileNumber")
            .exists()
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .custom(mobileExistOrg),
        (0, express_validator_1.body)("businessWebsite").optional(),
        (0, express_validator_1.body)("businessPanCardNumber").optional(),
        (0, express_validator_1.body)("gstNumber").exists().isString().isLength({ min: 3, max: 50 }),
        (0, express_validator_1.body)("organizationAddress")
            .exists()
            .isString()
            .isLength({ min: 3, max: 100 }),
        (0, express_validator_1.body)("businessEmail")
            .exists()
            .isEmail()
            .isLength({ min: 3, max: 50 })
            .custom(emailExistOrg),
    ],
    empPersonalDetails: [
        (0, express_validator_1.body)("fullName").exists().isLength({ min: 3, max: 20 }),
        (0, express_validator_1.body)("mobileNumber")
            .exists()
            .isNumeric()
            .isLength({ min: 10, max: 10 })
            .custom(empMobileExist),
        (0, express_validator_1.body)("emailId").exists().isEmail().custom(empEmailExist),
        (0, express_validator_1.body)("gender").exists(),
        (0, express_validator_1.body)("DOB").exists(),
        (0, express_validator_1.body)("maritalStatus").exists(),
        (0, express_validator_1.body)("department").exists(),
        (0, express_validator_1.body)("jobRole").exists(),
        (0, express_validator_1.body)("organizationName").exists(),
        (0, express_validator_1.body)("bankName").exists().isString().isLength({ min: 3, max: 50 }),
        (0, express_validator_1.body)("accountNumber").exists().isNumeric().isLength({ min: 8, max: 20 }),
        (0, express_validator_1.body)("ifscCode").exists().isString().isLength({ min: 11, max: 11 }),
        (0, express_validator_1.body)("branchName").exists().isString().isLength({ min: 3, max: 15 }),
        (0, express_validator_1.body)("guardianName").exists().isString().isLength({ min: 3, max: 15 }),
        (0, express_validator_1.body)("guardianMobileNumber")
            .exists()
            .isLength({ min: 10, max: 10 })
            .isNumeric(),
        (0, express_validator_1.body)("alternateGuardianName").isString().optional(),
        (0, express_validator_1.body)("alternateGuardianMobileNumber").optional(),
        (0, express_validator_1.body)("educationDetails").exists().isArray(),
        (0, express_validator_1.body)("permanentAddress").exists().isArray(),
        (0, express_validator_1.body)("currentAddress").exists().isArray(),
        (0, express_validator_1.body)("aadhaarNumber").isNumeric().isLength({ min: 12, max: 16 }).optional(),
        (0, express_validator_1.body)("panCardNumber")
            .isString()
            .isLength({ min: 10, max: 10 })
            .isAlphanumeric()
            .optional(),
        (0, express_validator_1.body)("passportNumber").isString().optional(),
        (0, express_validator_1.body)("profileImage").optional(),
    ],
    empUpdatePersonalDetails: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("fullName").exists().isLength({ min: 3, max: 20 }),
        (0, express_validator_1.body)("mobileNumber").exists().isNumeric().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)("emailId").exists().isEmail(),
        (0, express_validator_1.body)("gender").exists(),
        (0, express_validator_1.body)("DOB").exists(),
        (0, express_validator_1.body)("maritalStatus").exists(),
        (0, express_validator_1.body)("department").exists(),
        (0, express_validator_1.body)("jobRole").exists(),
        (0, express_validator_1.body)("organizationName").exists(),
        (0, express_validator_1.body)("bankName").exists().isString().isLength({ min: 3, max: 50 }),
        (0, express_validator_1.body)("accountNumber").exists().isNumeric().isLength({ min: 8, max: 20 }),
        (0, express_validator_1.body)("ifscCode").exists().isString().isLength({ min: 11, max: 11 }),
        (0, express_validator_1.body)("branchName").exists().isString().isLength({ min: 3, max: 15 }),
        (0, express_validator_1.body)("guardianName").exists().isString().isLength({ min: 3, max: 15 }),
        (0, express_validator_1.body)("guardianMobileNumber")
            .exists()
            .isLength({ min: 10, max: 10 })
            .isNumeric(),
        (0, express_validator_1.body)("alternateGuardianName").isString().optional(),
        (0, express_validator_1.body)("alternateGuardianMobileNumber").optional(),
        (0, express_validator_1.body)("educationDetails").exists().isArray(),
        (0, express_validator_1.body)("permanentAddress").exists().isArray(),
        (0, express_validator_1.body)("currentAddress").exists().isArray(),
        (0, express_validator_1.body)("aadhaarNumber").isNumeric().isLength({ min: 12, max: 12 }).optional(),
        (0, express_validator_1.body)("panCardNumber")
            .isString()
            .isLength({ min: 10, max: 10 })
            .isAlphanumeric()
            .optional(),
        (0, express_validator_1.body)("passportNumber").isString().optional(),
        (0, express_validator_1.body)("profileImage").optional(),
    ],
    empGetSpecifiedPersonalDetails: [(0, express_validator_1.param)("mobileNumber").exists()],
    updateAdminProfile: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("gender")
            .exists()
            .isIn([user_model_1.Gender.FEMALE, user_model_1.Gender.MALE, user_model_1.Gender.TRANSGENDER]),
        (0, express_validator_1.body)("emailId").exists().isEmail(),
        (0, express_validator_1.body)("aadhaarNumber").exists().isLength({ min: 12, max: 12 }),
        (0, express_validator_1.body)("DOB").exists(),
        (0, express_validator_1.body)("panCardNumber").optional(),
        (0, express_validator_1.body)("personalAddress").exists().isArray(),
        (0, express_validator_1.body)("alternateMobileNumber")
            .optional()
            .isLength({ min: 10, max: 10 })
            .isNumeric(),
        (0, express_validator_1.body)("alternateEmailId").optional().isEmail(),
    ],
    getJobRole: [(0, express_validator_1.param)("id").isMongoId()],
    getLastLoginTime: [(0, express_validator_1.param)("mobileNumber").exists()],
    assignShift: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("assignShift")
            .isIn([connfiguration_model_1.ShiftType.DAY_SHIFT, connfiguration_model_1.ShiftType.NIGHT_SHIFT])
            .exists()
            .isString(),
    ],
    getSingleReport: [(0, express_validator_1.param)("id").isMongoId()],
    getCustomReport: [
        (0, express_validator_1.query)("department").optional(),
        (0, express_validator_1.query)("date").optional(),
        (0, express_validator_1.query)("page").optional(),
        (0, express_validator_1.query)("limit").optional(),
    ],
    getCustomEmployeeList: [(0, express_validator_1.query)("page").optional(), (0, express_validator_1.query)("limit").optional()],
    filteredEmployee: [
        (0, express_validator_1.query)("assignedShift")
            .isIn([connfiguration_model_1.ShiftType.DAY_SHIFT, connfiguration_model_1.ShiftType.NIGHT_SHIFT])
            .optional(),
        (0, express_validator_1.query)("department").optional(),
        (0, express_validator_1.query)("jobRole").optional(),
    ],
    applyLeave: [
        (0, express_validator_1.body)("userId").isMongoId().exists(),
        (0, express_validator_1.body)("fromDate").isString().exists(),
        (0, express_validator_1.body)("toDate").isString().exists(),
        (0, express_validator_1.body)("subject").isString().exists(),
        (0, express_validator_1.body)("description").isString().exists(),
    ],
    getHolidayList: [(0, express_validator_1.query)("month").optional(), (0, express_validator_1.query)("year").optional()],
    updateLeave: [
        (0, express_validator_1.body)("leaveApprovalState")
            .exists()
            .isIn([
            leave_model_1.LeaveApprovalState.APPROVED,
            leave_model_1.LeaveApprovalState.REJECTED,
            leave_model_1.LeaveApprovalState.CANCELED,
        ]),
        (0, express_validator_1.param)("id").isMongoId(),
    ],
    getLeaveRequestList: [
        (0, express_validator_1.query)("userId").optional(),
        (0, express_validator_1.query)("page").optional(),
        (0, express_validator_1.query)("limit").optional(),
    ],
    adminLeaveRequestList: [(0, express_validator_1.query)("page").optional(), (0, express_validator_1.query)("limit").optional()],
    adminGetSeparateLeaveRequestList: [(0, express_validator_1.param)("id").isMongoId()],
    employeeAttendanceReport: [
        (0, express_validator_1.query)("userId").exists(),
        (0, express_validator_1.query)("page").optional(),
        (0, express_validator_1.query)("limit").optional(),
    ],
    leaveSearch: [(0, express_validator_1.query)("text").optional()],
    searchEmployee: [(0, express_validator_1.query)("text").optional()],
    searchAttendance: [(0, express_validator_1.query)("text").optional()],
    employeeSearchAttendance: [
        (0, express_validator_1.query)("userId").exists(),
        (0, express_validator_1.query)("text").optional(),
    ],
    employeeLeaveSearch: [(0, express_validator_1.query)("userId").exists(), (0, express_validator_1.query)("text").optional()],
    uploadImage: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("profileImage").exists().isString(),
    ],
    getAttendanceReport: [
        (0, express_validator_1.query)("userId").exists(),
        (0, express_validator_1.query)("page").optional(),
        (0, express_validator_1.query)("limit").optional(),
    ],
    attendanceReport: [(0, express_validator_1.query)("page").optional(), (0, express_validator_1.query)("limit").optional()],
    monthlyYearlyAttendanceReport: [
        (0, express_validator_1.query)("userId").exists(),
        (0, express_validator_1.query)("month").optional(),
        (0, express_validator_1.query)("year").optional(),
    ],
    monthlyYearlyCompleteReport: [
        (0, express_validator_1.query)("userId").exists(),
        (0, express_validator_1.query)("month").optional(),
        (0, express_validator_1.query)("year").optional(),
    ],
    addExpenses: [
        (0, express_validator_1.body)("userId").exists(),
        (0, express_validator_1.body)("userType").isString().exists(),
        (0, express_validator_1.body)("date").exists(),
        (0, express_validator_1.body)("amount").exists().isNumeric(),
        (0, express_validator_1.body)("description").exists().isString(),
        (0, express_validator_1.body)("attachment").exists(),
    ],
    updateExpenses: [
        (0, express_validator_1.param)("id").isMongoId(),
        (0, express_validator_1.body)("date").exists(),
        (0, express_validator_1.body)("amount").exists().isNumeric(),
        (0, express_validator_1.body)("description").exists().isString(),
        (0, express_validator_1.body)("attachment").exists(),
    ],
    deleteExpenses: [(0, express_validator_1.param)("id").isMongoId()],
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = exports.leaveController = exports.empPersonalDetailsControllers = exports.OrganizationController = exports.CompanyController = exports.ViewController = exports.TaskController = exports.StorageController = exports.ProjectController = exports.holidayController = exports.insightTypeController = exports.insightController = exports.userController = exports.jobRoleController = exports.departmentController = exports.configurationController = exports.AuthController = void 0;
exports.AuthController = __importStar(require("./auth.controller"));
exports.configurationController = __importStar(require("./configuration.controllers"));
exports.departmentController = __importStar(require("./department.controller"));
exports.jobRoleController = __importStar(require("./job-role.controller"));
exports.userController = __importStar(require("./user.controller"));
exports.insightController = __importStar(require("./insight.controller"));
exports.insightTypeController = __importStar(require("./insight-type.controller"));
exports.holidayController = __importStar(require("./holiday.controller"));
exports.ProjectController = __importStar(require("./project.controller"));
exports.StorageController = __importStar(require("./storage.controller"));
exports.TaskController = __importStar(require("./task.controller"));
exports.ViewController = __importStar(require("./view.controller"));
exports.CompanyController = __importStar(require("./company.controller"));
exports.OrganizationController = __importStar(require("./organization.controller"));
exports.empPersonalDetailsControllers = __importStar(require("./emp-personal-details.controller"));
exports.leaveController = __importStar(require("./leave.controller"));
exports.expenseController = __importStar(require("./expense.controller"));

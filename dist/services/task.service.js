"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
var Helper_1 = require("../classes/Helper");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var task_model_1 = require("../models/task.model");
var taskTransition_model_1 = require("../models/taskTransition.model");
var user_model_1 = require("../models/user.model");
var user_service_1 = require("./user.service");
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    TaskService.createTask = function (params, taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = null;
                        if (!taskId) return [3 /*break*/, 2];
                        return [4 /*yield*/, task_model_1.TaskSchema.findByIdAndUpdate(taskId, params)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, task_model_1.TaskSchema.create(params)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: 
                    // Helper.sendEmail();
                    return [2 /*return*/, result.toObject()];
                    case 5:
                        error_1 = _a.sent();
                        Helper_1.Helper.throwError("Error while creating task.", error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.createTaskTransition = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, taskTransition_model_1.TaskTransitionSchema.create(params)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.toObject()];
                    case 2:
                        error_2 = _a.sent();
                        Helper_1.Helper.throwError("Error while creating task.", error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.fetchTasks = function (assignedTo, taskStatus, projectIdWithRelease, userRole, deadlineDate) {
        return __awaiter(this, void 0, void 0, function () {
            var projectIds, query, projectReleaseQuery_1, result, userIdSet_1, usersIds, allUserDetails, usersMap_1, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectIds = projectIdWithRelease
                            ? Helper_1.Helper.stringToObjectIdArray(Object.keys(projectIdWithRelease))
                            : [];
                        query = [
                            {
                                $sort: {
                                    createdAt: 1,
                                },
                            },
                            {
                                $group: {
                                    _id: "$taskId",
                                    doc: { $last: "$$ROOT" },
                                },
                            },
                            { $replaceRoot: { newRoot: "$doc" } },
                            {
                                $lookup: {
                                    from: IDatabaseSchema_1.IDatabaseSchema.TASK,
                                    localField: "taskId",
                                    foreignField: "_id",
                                    as: "taskDetails",
                                },
                            },
                            {
                                $unwind: "$taskDetails",
                            },
                            {
                                $lookup: {
                                    from: IDatabaseSchema_1.IDatabaseSchema.PROJECT,
                                    localField: "taskDetails.projectId",
                                    foreignField: "_id",
                                    as: "projectDetails",
                                },
                            },
                            {
                                $unwind: "$projectDetails",
                            },
                        ];
                        // // by userId Query
                        if (assignedTo && assignedTo.length) {
                            query.splice(3, 0, {
                                $match: {
                                    assignedTo: {
                                        $in: Helper_1.Helper.stringToObjectIdArray(assignedTo),
                                    },
                                },
                            });
                        }
                        // By deadline date query
                        if (deadlineDate && deadlineDate.length) {
                            query.splice(0, 0, {
                                $match: {
                                    deadlineDate: {
                                        $in: deadlineDate,
                                    },
                                },
                            });
                        }
                        if (taskStatus && taskStatus.length) {
                            query.splice(0, 0, {
                                $match: {
                                    taskStatus: {
                                        $in: taskStatus,
                                    },
                                },
                            });
                        }
                        if (projectIds && projectIds.length) {
                            projectReleaseQuery_1 = {
                                $match: {
                                    $or: [],
                                },
                            };
                            projectIds.map(function (each) {
                                projectReleaseQuery_1["$match"].$or.push({
                                    $and: [
                                        {
                                            "taskDetails.projectId": {
                                                $in: [each],
                                            },
                                        },
                                    ],
                                });
                                if (projectIdWithRelease[each].length) {
                                    projectReleaseQuery_1["$match"].$or[0].$and.push({
                                        "taskDetails.releaseNumber": {
                                            $in: projectIdWithRelease[each],
                                        },
                                    });
                                }
                            });
                            query.splice(query.length - 1, 0, projectReleaseQuery_1);
                        }
                        Helper_1.Helper.logger(query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        result = null;
                        return [4 /*yield*/, taskTransition_model_1.TaskTransitionSchema.aggregate(query)];
                    case 2:
                        result = _a.sent();
                        userIdSet_1 = new Set();
                        if (result && result.length) {
                            result.forEach(function (each) {
                                if (each.assignedTo) {
                                    userIdSet_1.add(each.assignedTo.toString());
                                }
                                // Populate possible transition
                                var taskStatus = each.taskStatus;
                                var possibleTaskStatus = [];
                                if (userRole === user_model_1.UserType.EMPLOYEE) {
                                    switch (taskStatus) {
                                        case taskTransition_model_1.TaskStatus.PLANNED:
                                            possibleTaskStatus.push({ value: taskTransition_model_1.TaskStatus.IN_PROGRESS, text: "In progress" }, {
                                                value: taskTransition_model_1.TaskStatus.COMPLETED,
                                                text: "Completed",
                                            });
                                            break;
                                        case taskTransition_model_1.TaskStatus.IN_PROGRESS:
                                            possibleTaskStatus.push({
                                                value: taskTransition_model_1.TaskStatus.COMPLETED,
                                                text: "Completed",
                                            });
                                            break;
                                    }
                                }
                                else {
                                    possibleTaskStatus.push({ value: taskTransition_model_1.TaskStatus.CREATED, text: "Created" }, { value: taskTransition_model_1.TaskStatus.PLANNED, text: "Planned" }, { value: taskTransition_model_1.TaskStatus.IN_PROGRESS, text: "In progress" }, {
                                        value: taskTransition_model_1.TaskStatus.COMPLETED,
                                        text: "Completed",
                                    }, { value: taskTransition_model_1.TaskStatus.VERIFIED, text: "Verified" });
                                }
                                each.possibleTransition = possibleTaskStatus;
                            });
                        }
                        usersIds = Array.from(userIdSet_1);
                        if (!(usersIds && usersIds.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user_service_1.userServices.fetchUsers(null, usersIds)];
                    case 3:
                        allUserDetails = _a.sent();
                        usersMap_1 = new Map();
                        if (allUserDetails) {
                            allUserDetails.map(function (user) {
                                usersMap_1.set(user.id.toString(), user);
                            });
                        }
                        result.forEach(function (each) {
                            if (each.assignedTo) {
                                each.userDetails = usersMap_1.has(each.assignedTo.toString())
                                    ? usersMap_1.get(each.assignedTo.toString())
                                    : null;
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                    case 5:
                        error_3 = _a.sent();
                        Helper_1.Helper.throwError("Error while fetching task", error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.updateTaskStatus = function (taskId, userId, userRole, taskStatus, assignedTo) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTaskObj, notAllowedError, currentTaskStatus, newTaskTransitionObj, result, newTaskTransitionObj, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.taskCurrentStatus(taskId)];
                    case 1:
                        currentTaskObj = (_a.sent());
                        if (!(userRole === user_model_1.UserType.EMPLOYEE)) return [3 /*break*/, 7];
                        if (!currentTaskObj || !currentTaskObj.taskStatus) {
                            return [2 /*return*/, Helper_1.Helper.throwError("Error while fetching task")];
                        }
                        notAllowedError = function () {
                            return Helper_1.Helper.throwError("Transaction not allowed or not more further transaction possible.");
                        };
                        currentTaskStatus = currentTaskObj.taskStatus;
                        if (!(taskTransition_model_1.employeeTransitionPossibilities.has(currentTaskStatus) &&
                            taskTransition_model_1.employeeTaskStatusUpdateOrder[currentTaskStatus])) return [3 /*break*/, 5];
                        if (!taskTransition_model_1.employeeTransitionPossibilities
                            .get(currentTaskStatus)
                            .includes(taskTransition_model_1.employeeTaskStatusUpdateOrder[currentTaskStatus])) return [3 /*break*/, 3];
                        newTaskTransitionObj = __assign(__assign({}, currentTaskObj), { taskStatus: taskStatus, transitionDoneBy: userId, transitionType: taskTransition_model_1.TransitionType.STATUS_CHANGE, taskId: taskId, assignedTo: currentTaskObj.assignedTo });
                        return [4 /*yield*/, this.createTaskTransition(newTaskTransitionObj)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        notAllowedError();
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        notAllowedError();
                        return [2 /*return*/];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        newTaskTransitionObj = __assign(__assign({}, currentTaskObj), { taskStatus: assignedTo && taskStatus === taskTransition_model_1.TaskStatus.CREATED
                                ? taskTransition_model_1.TaskStatus.PLANNED
                                : taskStatus, transitionDoneBy: userId, transitionType: taskTransition_model_1.TransitionType.STATUS_CHANGE, taskId: taskId, assignedTo: assignedTo });
                        return [4 /*yield*/, this.createTaskTransition(newTaskTransitionObj)];
                    case 8:
                        result = _a.sent();
                        if (result.assignedTo) {
                            this.sendUpdateStatus(result.assignedTo, taskId, taskStatus);
                        }
                        return [2 /*return*/, result];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_4 = _a.sent();
                        Helper_1.Helper.throwError("Error while creating task.", error_4);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.taskCurrentStatus = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var task, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, taskTransition_model_1.TaskTransitionSchema.findOne({ taskId: taskId }).sort({
                                createdAt: -1,
                            })];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                    case 2:
                        error_5 = _a.sent();
                        Helper_1.Helper.throwError("Error while fetching current task status", error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.getTaskWithAssignedUserByTaskId = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var task, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, task_model_1.TaskSchema.findById(taskId).populate("assignedTo")];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, task];
                    case 2:
                        error_6 = _a.sent();
                        Helper_1.Helper.throwError("Error while fetching current task status.", error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TaskService.sendUpdateStatus = function (userId, taskId, taskStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var task, subject, htmlTemplate, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTaskWithAssignedUserByTaskId(taskId)];
                    case 1:
                        task = _a.sent();
                        subject = "Task update status";
                        htmlTemplate = "<h3> NetClack admin has updated the status of task.</h4>\n    <br>\n    <h4> ".concat(task.taskName, " to ").concat(taskStatus, " </h4>\n    <br>\n    Thanks & Regards,\n    <br>\n    NetClack Admin\n    ");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Helper_1.Helper.sendEmail(userId, subject, htmlTemplate)];
                    case 3:
                        result = _a.sent();
                        console.log("email response", result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_7 = _a.sent();
                        console.log("Error while sending email - ", error_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TaskService;
}());
exports.TaskService = TaskService;

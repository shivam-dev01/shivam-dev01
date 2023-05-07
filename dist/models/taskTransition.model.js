"use strict";
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTransitionSchema = exports.employeeTransitionPossibilities = exports.employeeTaskStatusUpdateOrder = exports.TaskStatus = exports.TransitionType = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var task_model_1 = require("./task.model");
var TransitionType;
(function (TransitionType) {
    TransitionType["ASSIGNMENT_CHANGE"] = "ASSIGNMENT_CHANGE";
    TransitionType["STATUS_CHANGE"] = "STATUS_CHANGE";
})(TransitionType = exports.TransitionType || (exports.TransitionType = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["CREATED"] = "CREATED";
    TaskStatus["PLANNED"] = "PLANNED";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["COMPLETED"] = "COMPLETED";
    TaskStatus["VERIFIED"] = "VERIFIED";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
exports.employeeTaskStatusUpdateOrder = (_a = {},
    _a[TaskStatus.CREATED] = null,
    _a[TaskStatus.IN_PROGRESS] = TaskStatus.COMPLETED,
    _a[TaskStatus.COMPLETED] = null,
    _a[TaskStatus.VERIFIED] = null,
    _a[TaskStatus.PLANNED] = TaskStatus.IN_PROGRESS,
    _a);
exports.employeeTransitionPossibilities = new Map()
    .set(TaskStatus.PLANNED, [TaskStatus.COMPLETED, TaskStatus.IN_PROGRESS])
    .set(TaskStatus.IN_PROGRESS, [TaskStatus.COMPLETED]);
var schema = new mongoose_1.Schema({
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    taskStatus: { type: String, required: false },
    transitionType: { type: String, required: false },
    transitionDoneBy: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    taskId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.isDelete;
            delete ret.__v;
            return ret;
        },
    },
});
schema.path("taskId").validate(function (value) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var project, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, task_model_1.TaskSchema.findOne({ _id: value })];
                            case 1:
                                project = _a.sent();
                                if (project) {
                                    resolve(true);
                                }
                                else {
                                    reject(new Error("Task not found"));
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                reject(new Error("Error while checking task status"));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
});
// schema.post("save", function (doc, next) {
//   // this.password = Helper.hashPassword(this.password);
//   console.log(doc);
//   next();
// });
exports.TaskTransitionSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.TASK_TRANSITION, schema);

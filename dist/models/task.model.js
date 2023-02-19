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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var project_model_1 = require("./project.model");
var taskTransition_model_1 = require("./taskTransition.model");
var schema = new mongoose_1.Schema({
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: false },
    deadlineDate: { type: String, required: false },
    taskAssets: [{ type: String, required: false }],
    isDelete: { type: Boolean, required: true, default: false },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.PROJECT,
    },
    taskStatus: { type: String, enum: taskTransition_model_1.TaskStatus, required: true },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    releaseNumber: {
        type: Number,
        required: true,
        // validate: {
        //   validator: async function (value) {
        //     const projectId = this.projectId;
        //     return new Promise<boolean>(async (resolve, reject) => {
        //       try {
        //         const project = await ProjectSchema.findOne({
        //           // _id: this.projectId,
        //         });
        //         if (project) {
        //           resolve(true);
        //         } else {
        //           reject(new Error("Project not found"));
        //         }
        //       } catch (error) {
        //         reject(new Error("Error while checking project status"));
        //       }
        //     });
        //   },
        //   message: "Email validation failed",
        // },
    },
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
schema
    .path("projectId")
    .validate(function (value) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var project, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, project_model_1.ProjectSchema.findOne({ _id: value })];
                            case 1:
                                project = _a.sent();
                                if (project) {
                                    resolve(true);
                                }
                                else {
                                    reject(new Error("Project not found"));
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                reject(new Error("Error while checking project status"));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
});
// schema.post("save", async function (doc, next) {
//   const transitionData: TaskTransitionModel = {
//     transitionDoneBy: Helper.stringToObjectId(doc.createdBy),
//     taskId: doc.id,
//     transitionType: TransitionType.STATUS_CHANGE,
//     taskStatus: TaskStatus.CREATED,
//   };
//   await TaskTransitionSchema.create(transitionData);
//   next();
// });
exports.TaskSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.TASK, schema);

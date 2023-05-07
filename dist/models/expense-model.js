"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSchema = exports.Status = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var user_model_1 = require("./user.model");
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["APPROVED"] = "APPROVED";
    Status["REJECTED"] = "REJECTED";
})(Status = exports.Status || (exports.Status = {}));
var schema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: IDatabaseSchema_1.IDatabaseSchema.USERS,
    },
    date: { type: String, required: false },
    userType: { type: String, required: false, enum: user_model_1.UserType },
    amount: { type: Number, required: false },
    description: { type: String, required: false },
    status: { type: String, required: true, default: Status.PENDING },
    attachment: { type: String, required: false },
    isDelete: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});
exports.ExpenseSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.EXPENSE, schema);

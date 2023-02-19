import moment from "moment";
import {
  ExpenseSchema,
  PaymentStatus,
  Status,
  TransactionType,
} from "../models/expense-model";
import { UserSchema, UserType } from "../models/user.model";

export class expenseService {
  constructor() {}

  static async addExpenses(
    params: {
      userId: string;
      date: string;
      description: string;
      amount: number;
      status: string;
      attachment: string;
      userType: string;
    },
    callback: Function
  ) {
    try {
      await ExpenseSchema.create(params);
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async updateExpenses(
    params: {
      date: string;
      description: string;
      amount: number;
      attachment: string;
    },
    Id,
    callback: Function
  ) {
    try {
      await ExpenseSchema.findByIdAndUpdate(Id, params);
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async deleteExpenses(id, isDelete = false, callback: Function) {
    try {
      if (id && isDelete) {
        await ExpenseSchema.findByIdAndUpdate(
          id,
          { isDelete },
          {
            new: true,
          }
        );
        callback(true);
      }
    } catch {
      callback(false);
    }
  }

  static async expensesLists(userType, Credit, UserId, callback: Function) {
    try {
      if (!userType && !Credit && !UserId) {
        const result = await ExpenseSchema.find({ isDelete: false }).populate(
          "userId"
        );
        callback(result);
      } else if (userType && userType === UserType.ROOT && !Credit && !UserId) {
        const result = await ExpenseSchema.find({
          userType: UserType.ROOT,
          isDelete: false,
        }).populate("userId");
        callback(result);
      } else if (
        userType &&
        userType === UserType.EMPLOYEE &&
        !Credit &&
        !UserId
      ) {
        const result = await ExpenseSchema.find({
          userType: UserType.EMPLOYEE,
          isDelete: false,
        }).populate("userId");
        callback(result);
      } else if (userType && userType === UserType.EMPLOYEE && Credit) {
        let array = [];
        const result = await ExpenseSchema.find({
          userType: UserType.EMPLOYEE,
          paymentStatus: PaymentStatus.CREDITED,
          isDelete: false,
        }).populate("userId");

        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
        const result1 = await ExpenseSchema.find({
          userType: UserType.EMPLOYEE,
          paymentStatus: PaymentStatus.PENDING,
          isDelete: false,
        }).populate("userId");
        for (let i = 0; i < result1.length; i++) {
          array.push(result1[i]);
        }
        callback(array);
      } else if (userType && userType === UserType.ROOT && Credit) {
        let array = [];
        const result = await ExpenseSchema.find({
          userType: UserType.ROOT,
          paymentStatus: PaymentStatus.CREDITED,
          isDelete: false,
        }).populate("userId");

        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
        const result1 = await ExpenseSchema.find({
          userType: UserType.ROOT,
          paymentStatus: PaymentStatus.PENDING,
          isDelete: false,
        }).populate("userId");
        for (let i = 0; i < result1.length; i++) {
          array.push(result1[i]);
        }
        callback(array);
      } else if (!userType && !Credit && UserId) {
        const result = await ExpenseSchema.find({
          userId: UserId,
        }).populate("userId");
        callback(result);
      } else if (!userType && Credit && UserId) {
        let array = [];
        const result = await ExpenseSchema.find({
          userId: UserId,
          paymentStatus: PaymentStatus.CREDITED,
          isDelete: false,
        }).populate("userId");

        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
        const result1 = await ExpenseSchema.find({
          userId: UserId,
          paymentStatus: PaymentStatus.PENDING,
          isDelete: false,
        }).populate("userId");
        for (let i = 0; i < result1.length; i++) {
          array.push(result1[i]);
        }
        callback(array);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async updateExpenseStatus(
    ID,
    params: {
      status: string;
      remark: string;
    },
    callback: Function
  ) {
    try {
      const expenseData = await ExpenseSchema.find({
        _id: ID,
        isDelete: false,
      });
      if (
        expenseData &&
        expenseData[0].status === Status.APPROVED &&
        params.status === Status.APPROVED
      ) {
        callback("alreadyApproved");
        return;
      } else if (
        expenseData &&
        expenseData[0].status === Status.REJECTED &&
        params.status === Status.REJECTED
      ) {
        callback("alreadyRejected");
        return;
      } else if (
        (expenseData &&
          expenseData[0].status === Status.APPROVED &&
          params.status === Status.REJECTED) ||
        (expenseData &&
          expenseData[0].status === Status.REJECTED &&
          params.status === Status.APPROVED)
      ) {
        callback("false");
      } else if (
        expenseData &&
        expenseData[0].status === Status.PENDING &&
        params.status === Status.APPROVED
      ) {
        await ExpenseSchema.findByIdAndUpdate(ID, {
          status: Status.APPROVED,
          approvedDate: moment().format(),
          paymentStatus: PaymentStatus.PENDING,
        });
        callback(Status.APPROVED);
        return;
      } else if (
        (params.status === Status.REJECTED && !params.remark) ||
        (params.status === Status.REJECTED && !params.remark.length)
      ) {
        callback("remarks");
        return;
      } else if (
        expenseData &&
        expenseData[0].status === Status.PENDING &&
        params.status === Status.REJECTED &&
        expenseData &&
        expenseData[0].status === Status.PENDING &&
        params.remark &&
        expenseData &&
        expenseData[0].status === Status.PENDING &&
        params.remark.length
      ) {
        await ExpenseSchema.findByIdAndUpdate(ID, {
          status: Status.REJECTED,
          remark: params.remark,
          rejectedDate: moment().format(),
        });
        callback(Status.REJECTED);
        return;
      } else {
        callback("false");
        return;
      }
    } catch {
      callback("false");
    }
  }

  static async expensePaymentStatus(
    ID,
    params: {
      transactionType: string;
      paymentStatus: string;
      bankRRNNumber: string;
      amountCreditedDate: string;
    },
    callback: Function
  ) {
    try {
      const result = await ExpenseSchema.find({ _id: ID });
      if (result && result[0].status === Status.APPROVED) {
        await ExpenseSchema.findByIdAndUpdate(ID, {
          transactionType: params.transactionType,
          paymentStatus: PaymentStatus.CREDITED,
          bankRRNNumber: params.bankRRNNumber,
          amountCreditedDate: params.amountCreditedDate,
        });
        callback("true");
      } else {
        callback("notApproved");
      }
    } catch {
      callback("false");
    }
  }

  static async filterExpense(
    Department,
    JobRole,
    BillStatus,
    PaymentStatus,
    Month,
    Year,
    callback: Function
  ) {
    try {
      if (
        Department &&
        !JobRole &&
        !BillStatus &&
        !PaymentStatus &&
        !Month &&
        !Year
      ) {
        const userData = await UserSchema.find({
          department: Department,
        });
        const data = userData.map((each: any) => {
          return each._id;
        });
        const filteredData = await ExpenseSchema.find({
          userId: { $in: data },
        }).populate("userId");
        callback(filteredData);
      } else if (
        Department &&
        JobRole &&
        !BillStatus &&
        !PaymentStatus &&
        !Month &&
        !Year
      ) {
        const userData = await UserSchema.find({
          department: Department,
          jobRole: JobRole,
        });

        const data = userData.map((each: any) => {
          return each._id;
        });

        const filteredData = await ExpenseSchema.find({
          userId: { $in: data },
        }).populate("userId");
        callback(filteredData);
      } else if (
        !Department &&
        !JobRole &&
        BillStatus &&
        !PaymentStatus &&
        !Month &&
        !Year
      ) {
        const result = await ExpenseSchema.find({
          status: BillStatus,
        }).populate("userId");
        callback(result);
      } else if (
        !Department &&
        !JobRole &&
        !BillStatus &&
        PaymentStatus &&
        !Month &&
        !Year
      ) {
        const result = await ExpenseSchema.find({
          paymentStatus: PaymentStatus,
        }).populate("userId");
        callback(result);
      } else if (
        !Department &&
        !JobRole &&
        !BillStatus &&
        !PaymentStatus &&
        Month &&
        Year
      ) {
        const date = await `${Month}-${Year}`;

        const result = await ExpenseSchema.find({
          userType: UserType.ROOT,
          date: { $regex: ".*" + date + ".*", $options: "i" },
        });
        callback(result);
      } else if (
        !Department &&
        !JobRole &&
        !BillStatus &&
        !PaymentStatus &&
        !Month &&
        Year
      ) {
        const result = await ExpenseSchema.find({
          userType: UserType.ROOT,
          date: { $regex: ".*" + Year + ".*", $options: "i" },
        });
        callback(result);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }

  static async singleExpense(Id, callback: Function) {
    try {
      if (Id) {
        const result = await ExpenseSchema.find({
          _id: Id,
          isDelete: false,
        }).populate("userId");
        callback(result);
      } else {
        callback(false);
      }
    } catch {
      callback(false);
    }
  }
}

import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { Status } from "../models/expense-model";
import { expenseService } from "../services/expense.service";

export const addExpenses = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      userId: body.userId,
      userType: body.userType,
      date: body.date,
      amount: body.amount,
      description: body.description,
      status: body.status,
      attachment: body.attachment,
    };
    expenseService.addExpenses(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Expense added successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateExpenses = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      date: body.date,
      amount: body.amount,
      description: body.description,
      attachment: body.attachment,
    };
    expenseService.updateExpenses(data, req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Expense details updated successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteExpenses = async (req: Request, res: Response) => {
  const isDelete = req.method === RequestMethod.DELETE;
  try {
    expenseService.deleteExpenses(req.params.id, isDelete, (result: any) => {
      new HttpResponse(
        res,
        result ? "Expense deleted successfully." : "Failed",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const expensesLists = async (req: Request, res: Response) => {
  try {
    expenseService.expensesLists(
      req.query.userType,
      req.query.CREDIT,
      req.query.userId,
      (result: any) => {
        new HttpResponse(
          res,
          result.length >= 1
            ? "Expense lists fetched successfully."
            : result.length === 0
            ? "No records found."
            : "Error while fetching expense list.",
          result,
          result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateExpenseStatus = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      status: body.status,
      remark: body.remark,
    };
    expenseService.updateExpenseStatus(req.params.id, data, (result: any) => {
      console.log(result, "--------0000000");
      new HttpResponse(
        res,
        result === Status.APPROVED
          ? "Expense approved successfully."
          : result === Status.REJECTED
          ? "Expense rejected."
          : result === "false"
          ? "Error while updating expense status."
          : result === "remarks"
          ? "Remarks missing."
          : result === "alreadyApproved"
          ? "This expense is already approved."
          : result === "alreadyRejected"
          ? "This expense is already rejected."
          : "Error while updating expense status.",
        result,
        result === Status.APPROVED
          ? HttpStatuses.OK
          : result === Status.REJECTED
          ? HttpStatuses.OK
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "remarks"
          ? HttpStatuses.BAD_REQUEST
          : result === "alreadyApproved"
          ? HttpStatuses.BAD_REQUEST
          : result === "alreadyRejected"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const expensePaymentStatus = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      transactionType: body.transactionType,
      paymentStatus: body.paymentStatus,
      bankRRNNumber: body.bankRRNNumber,
      amountCreditedDate: body.amountCreditedDate,
    };
    expenseService.expensePaymentStatus(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Payment status updated successfully."
          : result === "false"
          ? "Error while updating payment status."
          : result === "notApproved"
          ? "Your have not approved this bill yet."
          : "Error while updating payment status.",
        result,
        result === "true" ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const filterExpense = async (req: Request, res: Response) => {
  try {
    expenseService.filterExpense(
      req.query.department,
      req.query.jobRole,
      req.query.billStatus,
      req.query.paymentStatus,
      req.query.month,
      req.query.year,
      (result: any) => {
        new HttpResponse(
          res,
          result.length >= 1
            ? "Expense lists fetched successfully."
            : result.length === 0
            ? "No records found."
            : "Error while fetching expense list.",
          result,
          result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
        ).sendResponse();
      }
    );
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const singleExpense = async (req: Request, res: Response) => {
  try {
    expenseService.singleExpense(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result.length >= 1
          ? "Expense fetched successfully."
          : result.length === 0
          ? "No records found."
          : "Error while fetching expense.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

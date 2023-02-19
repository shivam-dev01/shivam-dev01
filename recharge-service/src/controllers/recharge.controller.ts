import { Request, Response } from "express";
import { body } from "express-validator";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { OperatorServiceTypes, PaymentType, RechargeStatus } from "../models";
import { RechargeService } from "../services/recharge.service";

export const recharge = async (req: Request, res: Response) => {
  RechargeService.testServices((result: any) => {
    new HttpResponse(
      res,
      "Recharge discovered services",
      result
    ).sendResponse();
  });
};

export const getRechargeStatus = async (req: Request, res: Response) => {
  const body = req.body;
  const rechargeData = {
    transactionNumber: body.transactionNumber,
  };
  RechargeService.checkRechargeStatus(rechargeData, (result: any) => {
    if (result === false) {
      return new HttpResponse(
        res,
        Messages.RECHARGE_TRANSACTION_NOT_FOUND_MESSAGE,
        result,
        HttpStatuses.BAD_REQUEST
      ).sendResponse();
    } else {
      new HttpResponse(
        res,
        Messages.RECHARGE_STATUS_MESSAGE,
        result,
        HttpStatuses.OK
      ).sendResponse();
    }
  });
};

export const getReports = async (req: Request, res: Response) => {
  console.log(req.body.user);

  const paymentType = req.query.reportType as PaymentType;
  const serviceType = req.query.serviceType as OperatorServiceTypes;
  const userId = req.body.user.id;

  const report = await RechargeService.fetchReport(
    serviceType,
    paymentType,
    userId
  );

  new HttpResponse(res, Messages.REPORT_FETCHED_MESSAGE, report).sendResponse();
};

export const getOperator = async (req: Request, res: Response) => {
  const serviceType = req.query.serviceType as OperatorServiceTypes;

  const operator = await RechargeService.fetchOperator(serviceType);

  new HttpResponse(
    res,
    Messages.OPERATOR_FETCHED_MESSAGE,
    operator
  ).sendResponse();
};

export const getCircle = async (req: Request, res: Response) => {
  const circle = await RechargeService.fetchCircle();

  new HttpResponse(res, Messages.CIRCLE_FETCHED_MESSAGE, circle).sendResponse();
};

export const doRecharge = async (req: Request, res: Response) => {
  const body = req.body;

  const userId = Helper.getUserId(req);

  console.log(userId);

  const data = {
    rechargeNumber: body.rechargeNumber,
    rechargeAmount: body.rechargeAmount,
    circleCode: body.circleCode,
    operatorCode: body.operatorCode,
    userId: userId,
  };

  RechargeService.doRecharge(data, (result: any) => {
    new HttpResponse(
      res,
      result === RechargeStatus.SUCCESS
        ? Messages.RECHARGE_SUCCESS_MESSAGE
        : result === RechargeStatus.FAILURE
        ? Messages.RECHARGE_FAILED_MESSAGE
        : Messages.RECHARGE_PENDING_MESSAGE,
      result,
      result === RechargeStatus.SUCCESS
        ? HttpStatuses.OK
        : result === RechargeStatus.FAILURE
        ? HttpStatuses.BAD_REQUEST
        : HttpStatuses.PENDING
    ).sendResponse();
  });
};

export const billFetchFields = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    operator: body.operator,
    paymentNumber: body.paymentNumber,
  };
  RechargeService.billFetchFields(data, (result: any) => {
    new HttpResponse(
      res,
      result ? Messages.BILL_FETCHED_MESSAGE : "Failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const billFetch = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    operator: body.operator,
    paymentNumber: body.paymentNumber,
    requestData: body.requestData,
  };
  RechargeService.billFetch(data, (result: any) => {
    new HttpResponse(
      res,
      result ? Messages.BILL_FETCHED_MESSAGE : "Failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const planFetch = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    planFetchNumber: body.planFetchNumber,
    circleCode: body.circleCode,
    operatorCode: body.operatorCode,
  };
  RechargeService.planFetch(data, (result: any) => {
    new HttpResponse(
      res,
      result ? Messages.PLAN_FETCHED_MESSAGE : "Failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const billPayment = async (req: Request, res: Response) => {
  const userId = Helper.getUserId(req);
  const body = req.body;
  const data = {
    billPaymentNumber: body.billPaymentNumber,
    operatorCode: body.operatorCode,
    // circleCode: body.circleCode,
    amount: body.amount,
    landlineCaNumber: body.landlineCaNumber,
    otherValue: body.otherValue,
    userId: userId,
  };

  RechargeService.billPayment(data, (result: any) => {
    new HttpResponse(
      res,
      result === RechargeStatus.SUCCESS
        ? Messages.BILL_PAYMENT_SUCCESS_MESSAGE
        : result === RechargeStatus.FAILURE
        ? Messages.BILL_PAYMENT_FAILED_MESSAGE
        : Messages.BILL_PAYMENT_PENDING_MESSAGE,
      null,
      result === RechargeStatus.SUCCESS
        ? HttpStatuses.OK
        : result === RechargeStatus.FAILURE
        ? HttpStatuses.BAD_REQUEST
        : HttpStatuses.PENDING
    ).sendResponse();
  });
};
function userId(
  serviceType: OperatorServiceTypes,
  paymentType: PaymentType,
  userId: any
) {
  throw new Error("Function not implemented.");
}

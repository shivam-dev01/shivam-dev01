import { Request, response, Response } from "express";
import { body } from "express-validator";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { WalletSchema } from "../models/wallet.model";
import { WalletService } from "../services/wallet.service";

export const recharge = async (req: Request, res: Response) => {
  // const result = await RechargeService.fetchReport("sh");

  new HttpResponse(
    res,
    "Response from commission controller",
    []
  ).sendResponse();
};

export const createWallet = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    userId: body.userId,
    availableBalance: body.availableBalance,
    usableBalance: body.usableBalance,
  };

  WalletService.createWallet(data, (result: any) => {
    new HttpResponse(
      res,
      result
        ? Messages.CREATE_WALLET_SUCCESS_MASSAGE
        : Messages.CREATE_WALLET_FAILED_MESSAGE,
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};
export const getWallet = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    userId: body.userId,
  };
  WalletService.getWallet(data, (result: any) => {
    new HttpResponse(
      res,
      result
        ? Messages.GET_WALLET_SUCCESS_MESSAGE
        : Messages.GET_WALLET_FAILED_MESSAGE,
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const payment = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    userId: body.userId,
    amount: body.amount,
    serviceType: body.serviceType,
    paymentState: body.paymentState,
    paymentType: body.paymentType,
  };
  WalletService.payment(data, (result: any) => {
    new HttpResponse(
      res,
      result
        ? Messages.CREATE_PAYMENT_SUCCESS_MESSAGE
        : Messages.CREATE_PAYMENT_FAILED_MESSAGE,
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const generatePaymentId = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    amount: body.amount,
  };
  WalletService.generatePaymentId(data, (result: any) => {
    new HttpResponse(
      res,
      result
        ? Messages.PAYMENT_ID_GENERATED_SUCCESSFULLY
        : Messages.PAYMENT_ID_GENERATED_ERROR,
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const updateWalletBalance = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    userId: body.userId,
    creditWalletAmount: body.creditWalletAmount,
  };
  WalletService.updateWalletBalance(data, (result: any) => {
    new HttpResponse(
      res,
      result ? "Success" : "Failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const reports = async (req: Request, res: Response) => {
  console.log(req.body);
  const userId = req.body.user.id;

  WalletService.reports(userId, (result: any) => {
    new HttpResponse(
      res,
      result ? Messages.WALLET_REPORT_FETCHED_SUCCESS_MESSAGE : Messages.FAILED,
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const checkTransactionStatus = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    merchantTranid: body.merchantTranid,
    merchantLoginId: body.merchantLoginId,
    merchantpassword: body.merchantpassword,
    superMerchantId: body.superMerchantId,
    superMerchantPassword: body.superMerchantPassword,
  };
  WalletService.checkTransactionStatus(data, (result: any) => {
    new HttpResponse(
      res,
      result ? "success" : "failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  });
};

export const collectPayRequest = async(req:Request, res:Response)=>{
  const body = req.body;
  const data = {
    payerVa:body.payerVa,
    amount:body.amount,
    note:body.note,
    collectByDate:body.collectByDate,
    merchantId:body.merchantId,
    merchantName:body.merchantName,
    subMerchantId:body.subMerchantId,
    subMerchantName:body.subMerchantName,
    terminalId:body.terminalId,
    merchantTranId:body.merchantTranId,
    billNumber:body.billNumber,
  }
  WalletService.collectPayRequest(data, (result:any)=>{
    new HttpResponse(
      res,
      result ? "success" : "failed",
      result,
      result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
    ).sendResponse();
  })
}

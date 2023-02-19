import console, { Console } from "console";
import { body } from "express-validator";
import { json } from "stream/consumers";
import { Api } from "../classes/Api";
import { Helper } from "../classes/Helper";
import { Environment } from "../constants/Environment";
import { ExternalApis } from "../constants/ExternalApis";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { IExternalApi, RequestMethod } from "../interfaces/IExternalApi";
import {
  CircleSchema,
  OperatorSchema,
  OperatorServiceTypes,
  PaymentType,
  RechargeStatus,
  ReportModel,
  ReportSchema,
} from "../models";

const FormData = require("form-data");
export class RechargeService {
  constructor() {}

  static async testServices(callback: Function) {
    const api: IExternalApi = {
      url: "http://auth-srv:4001/v1/auth/test",
      requestMethod: RequestMethod.GET,
      input: {},
      response: (res: any) => {
        callback(res);
      },
      errorFunction: (err: any) => {
        callback(err);
      },
    };

    Api.callApi(api);
  }

  static async fetchReport(
    serviceType: OperatorServiceTypes,
    paymentType: PaymentType,
    userId: any
  ) {
    console.log("Operator_Code");

    // const users = await ReportSchema.find({
    //   serviceType: serviceType,
    //   paymentType: paymentType,
    //   userId: userId,
    // });

    const keysToSend = {
      createdAt: 1,
      rechargeNumber: 1,
      rechargeAmount: 1,
      transactionNumber: 1,
      status: 1,
      errorMessage: 1,
    };

    const reports = await ReportSchema.aggregate([
      {
        $match: {
          serviceType: serviceType,
          paymentType: paymentType,
          userId: userId,
        },
      },
      {
        $lookup: {
          from: IDatabaseSchema.OPERATOR,
          localField: "operatorCode",
          foreignField: "Operator_Code",
          as: "operatorCode",
        },
      },
      {
        $project: {
          ...keysToSend,
          operatorCode: { $arrayElemAt: ["$operatorCode", 0] },
        },
      },
      {
        $project: {
          ...keysToSend,
          operatorName: "$operatorCode.Operator_Name",
        },
      },
    ]).sort({ createdAt: -1 });

    return reports;
  }

  static async newRechargeReport(rechargeParams: {
    rechargeNumber: string;
    // circleCode: string;
    rechargeAmount: string;
    operatorCode: string;
    userId: string;
  }) {
    const transactionId = Helper.generateRechargeTransactionId();
    const reports = await new ReportSchema({
      ...rechargeParams,
      transactionNumber: transactionId,
    });

    await reports.save();
    return reports;
  }

  static async paymentRefund(
    userId: string,
    amount: string,
    callback?: Function
  ) {
    const paymentRefundApi: IExternalApi = {
      url: `${ExternalApis.WALLET_PAYMENT}`,
      requestMethod: RequestMethod.POST,
      input: {
        userId: userId,
        amount: amount,
        serviceType: "RECHARGE",
        paymentState: "REFUND",
        paymentType: "CREDIT",
      },
      response: (paymentRefundResponse: any) => {
        console.log(paymentRefundResponse);
      },
    };
    Api.callApi(paymentRefundApi);
  }

  static async doRecharge(
    rechargeParams: {
      rechargeNumber: string;
      circleCode: string;
      rechargeAmount: string;
      operatorCode: string;
      serviceType?: any;
      paymentType?: PaymentType;
      userId: string;
    },
    callback: Function
  ) {
    const paymentRefund = () => {
      this.paymentRefund(rechargeParams.userId, rechargeParams.rechargeAmount);
    };

    const operator = await OperatorSchema.findOne({
      Operator_Code: rechargeParams.operatorCode,
    });
    rechargeParams.paymentType = PaymentType.RECHARGE;
    rechargeParams.serviceType =
      operator && operator.Service_Type ? operator.Service_Type : null;

    const getWalletServiceApi: IExternalApi = {
      url: `${ExternalApis.WALLET_PAYMENT}`,
      requestMethod: RequestMethod.POST,
      input: {
        userId: rechargeParams.userId,
        amount: rechargeParams.rechargeAmount,
        serviceType: "RECHARGE",
        paymentState: "INITIATED",
        paymentType: "DEBIT",
      },
      response: async (walletPaymentResponse: any) => {
        console.log(
          "------------------------------------",
          walletPaymentResponse
        );
        if (walletPaymentResponse.result.status === 10000) {
          const reportObj = await this.newRechargeReport(rechargeParams);
          const api: IExternalApi = {
            url: `${ExternalApis.DO_RECHARGE.replace(
              "{rechargeNumber}",
              rechargeParams.rechargeNumber
            )
              .replace("{Operator_Code}", rechargeParams.operatorCode)
              .replace("{Circle_Code}", rechargeParams.circleCode)
              .replace("{AMOUNT}", rechargeParams.rechargeAmount)
              .replace("{txn}", reportObj.transactionNumber)}`,

            requestMethod: RequestMethod.GET,
            input: {},
            response: async (res: any) => {
              console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", res);
              let result = null;
              if (
                res.Status === RechargeStatus.FAILURE ||
                res.Status === RechargeStatus.Failure
              ) {
                reportObj.status = RechargeStatus.FAILURE;
                reportObj.errorMessage = res.ErrorMessage
                  ? res.ErrorMessage
                  : null;
                result = RechargeStatus.FAILURE;
                paymentRefund();
              } else if (res.Status === RechargeStatus.SUCCESS) {
                reportObj.status = RechargeStatus.SUCCESS;
                result = RechargeStatus.SUCCESS;
              } else if (res.Status === RechargeStatus.PENDING) {
                reportObj.status = RechargeStatus.PENDING;
                reportObj.errorMessage = res.ErrorMessage
                  ? res.ErrorMessage
                  : null;
                result = RechargeStatus.PENDING;
              }

              await reportObj.save();

              callback(result);
            },
          };
          Api.callApi(api);
        } else {
          callback(walletPaymentResponse.result);
        }
      },
    };

    Api.callApi(getWalletServiceApi);
  }

  static async fetchCircle() {
    const circle = await CircleSchema.find({});
    return Helper.dropdownValueConversion(circle, "CircleCode", "CircleName");
  }

  static async fetchOperator(serviceType: OperatorServiceTypes) {
    const operator = await OperatorSchema.find({ Service_Type: serviceType });
    return Helper.dropdownValueConversion(
      operator,
      "Operator_Code",
      "Operator_Name"
    );
  }
  static async checkRechargeStatus(
    rechargeStatusParams: {
      transactionNumber: string;
    },
    callback: Function,
    reportObjInstance?: any
  ) {
    const reportObj = reportObjInstance
      ? reportObjInstance
      : await ReportSchema.findOne({
          transactionNumber: rechargeStatusParams.transactionNumber,
        });
    if (!reportObj) {
      callback(false);
    } else {
      const api: IExternalApi = {
        url: `${ExternalApis.CHECK_RECHARGE_STATUS.replace(
          "{transactionNumber}",
          rechargeStatusParams.transactionNumber
        )}`,
        requestMethod: RequestMethod.GET,
        input: {},
        response: async (res: any) => {
          if (res.Status === RechargeStatus.FAILURE) {
            // initiating refund

            if (reportObj.status === RechargeStatus.PENDING) {
              await this.paymentRefund(
                reportObj.userId,
                reportObj.rechargeAmount,
                () => {
                  console.log("Pending to failure found!. Refund initiated.");
                }
              );
            }

            reportObj.status = RechargeStatus.FAILURE;
            reportObj.errorMessage = res.ErrorMessage ? res.ErrorMessage : null;
            // result = RechargeStatus.FAILURE;
          } else if (res.Status === RechargeStatus.SUCCESS) {
            reportObj.status = RechargeStatus.SUCCESS;
            // result = RechargeStatus.SUCCESS;
          } else if (res.Status === RechargeStatus.PENDING) {
            reportObj.errorMessage = res.ErrorMessage ? res.ErrorMessage : null;
            reportObj.status = RechargeStatus.PENDING;
            // result = RechargeStatus.PENDING;
          }
          await reportObj.save();
          console.log(res);
          callback(res);
        },
        errorFunction: (error: any) => {
          callback(error);
        },
      };

      Api.callApi(api);
      console.log(api.url);
    }
  }

  static async billFetchFields(
    billFetchParams: {
      operator: string;
      paymentNumber: string;
    },
    callback: Function
  ) {
    const requestApi: IExternalApi = {
      url: `${ExternalApis.BILL_FETCH}`,
      requestMethod: RequestMethod.POST,
      input: Helper.convertToFormData({
        memberid: Environment.CYRUS_MEMBER_ID,
        pin: Environment.CYRUS_PIN_FOR_BILL_FETCH_NEW_API,
        methodname: Environment.METHOD_NAME,
        operator: billFetchParams.operator,
      }),

      response: (requestResponse: any) => {
        console.log(JSON.parse(JSON.stringify(requestResponse)));
        callback(JSON.parse(JSON.stringify(requestResponse)).Request);
      },
      errorFunction: (err: any) => {
        console.log(err);
        callback(err);
      },
    };

    Api.callApi(requestApi);
  }

  static async billFetch(
    billFetchParams: {
      operator: string;
      paymentNumber: string;
      requestData: any;
    },
    callback: Function
  ) {
    console.log(billFetchParams.requestData);
    const finalApi: IExternalApi = {
      url: `${ExternalApis.BILL_FETCH}`,
      requestMethod: RequestMethod.POST,
      input: Helper.convertToFormData({
        memberid: Environment.CYRUS_MEMBER_ID,
        pin: Environment.CYRUS_PIN_FOR_BILL_FETCH_NEW_API,
        methodname: Environment.METHOD_NAME1,
        operator: billFetchParams.operator,
        RequestData: JSON.stringify(billFetchParams.requestData),
        format: "json",
      }),

      response: (finalResponse: any) => {
        console.log(finalResponse);
        callback(finalResponse);
      },
      errorFunction: (err: any) => {
        console.log(err);
        callback(err);
      },
    };

    Api.callApi(finalApi);
  }

  static async planFetch(
    planFetchParams: {
      planFetchNumber: string;
      circleCode: string;
      operatorCode: string;
    },
    callback: Function
  ) {
    const api: IExternalApi = {
      url: `${ExternalApis.PLAN_FETCH.replace(
        "{planFetchNumber}",
        planFetchParams.planFetchNumber
      )
        .replace("{Circle_Code}", planFetchParams.circleCode)
        .replace("{Operator_Code}", planFetchParams.operatorCode)}`,
      requestMethod: RequestMethod.POST,
      input: {},
      response: (res: any) => {
        callback(res);
      },
    };
    Api.callApi(api);
    console.log(api.url);
  }

  static async billPayment(
    billPaymentParams: {
      billPaymentNumber: string;
      operatorCode: string;
      // circleCode: string;
      amount: string;
      landlineCaNumber: string;
      otherValue: string;
      paymentType?: PaymentType;
      serviceType?: any;
      userId: string;
    },
    callback: Function
  ) {
    const operator = await OperatorSchema.findOne({
      Operator_Code: billPaymentParams.operatorCode,
    });

    billPaymentParams.serviceType =
      operator && operator.Service_Type ? operator.Service_Type : null;

    const rechargeParams = {
      rechargeNumber: billPaymentParams.billPaymentNumber,
      rechargeAmount: billPaymentParams.amount,
      transactionNumber: billPaymentParams.landlineCaNumber,
      // circleCode: billPaymentParams.circleCode,
      operatorCode: billPaymentParams.operatorCode,
      paymentType: PaymentType.BILL_PAYMENT,
      serviceType: billPaymentParams.serviceType,
      userId: billPaymentParams.userId,
    };

    const reportObj = await this.newRechargeReport(rechargeParams);

    const api: IExternalApi = {
      url: `${ExternalApis.BILL_PAYMENT.replace(
        "{billPaymentNumber}",
        billPaymentParams.billPaymentNumber
      )
        .replace("{operatorCode}", billPaymentParams.operatorCode)
        // .replace("{circleCode}", billPaymentParams.circleCode)
        .replace("{amount}", billPaymentParams.amount)
        .replace("{txn}", Helper.generateRechargeTransactionId())
        .replace("{landlineCaNumber}", billPaymentParams.landlineCaNumber)
        .replace("{otherValue}", billPaymentParams.otherValue)}`,
      input: {},
      requestMethod: RequestMethod.POST,
      response: async (res: any) => {
        let result = null;
        if (res.Status === RechargeStatus.FAILURE) {
          reportObj.status = RechargeStatus.FAILURE;
          reportObj.errorMessage = res.ErrorMessage ? res.ErrorMessage : null;
          result = RechargeStatus.FAILURE;
        } else if (res.Status === RechargeStatus.SUCCESS) {
          reportObj.status = RechargeStatus.SUCCESS;
          result = RechargeStatus.SUCCESS;
        } else if (res.Status === RechargeStatus.PENDING) {
          reportObj.errorMessage = res.ErrorMessage ? res.ErrorMessage : null;
          reportObj.status = RechargeStatus.PENDING;
          result = RechargeStatus.PENDING;
        }
        await reportObj.save();
        callback(result);
      },
    };
    Api.callApi(api);
    console.log(api.url);
  }
}

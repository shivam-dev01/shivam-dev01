import { NumericTypes } from "mongoose";
import { Api } from "../classes/Api";
import { Helper } from "../classes/Helper";
import { ExternalApis } from "../constants/ExternalApis";
import { Messages } from "../constants/Messages";
import { IExternalApi, RequestMethod } from "../interfaces/IExternalApi";
import { WalletStatuses } from "../interfaces/IWalletStatuses";
import { ReportSchema } from "../models";
import {
  PaymentState,
  PaymentType,
  WalletSchema,
} from "../models/wallet.model";

export class WalletService {
  constructor() {}

  static async fetchReport(userId: string) {
    const users = await ReportSchema.find({});
    return users;
  }

  static async createWallet(
    walletParams: {
      userId: string;
      availableBalance: number;
      usableBalance: number;
    },
    callback: Function
  ) {
    try {
      const walletReports = await new WalletSchema(walletParams);
      console.log(walletReports);
      await walletReports.save();
      callback(true);
      return walletReports;
    } catch (err) {
      callback(err);
    }
  }

  static async getWallet(
    getWalletParams: {
      userId: string;
    },
    callback: Function
  ) {
    try {
      let users = await WalletSchema.findOne(
        getWalletParams,
        "availableBalance usableBalance"
      );

      console.log(users);
      callback(users);
    } catch (err) {
      callback(err);
    }
  }

  static async generatePaymentId(
    params: {
      amount: number;
    },
    callback: Function
  ) {
    const Razorpay = require("razorpay");
    const instance = new Razorpay({
      key_id: "rzp_live_94MwFHIvIPpjoI",
      key_secret: "mdeBFe3YHnROD9NZXGchuXh7",
    });

    const options = {
      amount: params.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt:
        "wallet-topup-" +
        Helper.generatePaymentTransactionId(PaymentType.CREDIT),
    };
    instance.orders.create(options, function (err: any, order: any) {
      console.log(order);
      callback(order);
    });
  }

  static async payment(
    paymentParams: {
      userId: string;
      amount: number;
      serviceType: string;
      paymentState: string;
      paymentType: string;
    },
    callback: Function
  ) {
    try {
      const PaymentTransactionId = Helper.generatePaymentTransactionId(
        paymentParams.paymentType as PaymentType
      );
      const paymentReport =
        (await new ReportSchema(paymentParams)) &&
        new ReportSchema({
          ...paymentParams,
          transactionNumber: PaymentTransactionId,
        });

      await this.getWallet(
        {
          userId: paymentParams.userId,
        },
        async (result: any) => {
          if (
            paymentParams.paymentState === PaymentState.INITIATED ||
            paymentParams.paymentType === PaymentType.DEBIT
          ) {
            if (result.availableBalance >= paymentParams.amount) {
              const newBalance = result.availableBalance - paymentParams.amount;
              await WalletSchema.findByIdAndUpdate(result._id, {
                availableBalance: newBalance,
              });
              await paymentReport.save();
              callback({
                status: WalletStatuses.TRANSACTION_DONE,
                message: Messages.TRANSACTION_SUCCESS_MESSAGE,
                txnId: PaymentTransactionId,
              });
            } else {
              callback({
                status: WalletStatuses.INSUFFICIENT_BALANCE,
                message: Messages.INSUFFICIENT_BALANCE_MESSAGE,
              });
            }
          } else {
            await paymentReport.save();
            this.updateWalletBalance(
              {
                userId: paymentParams.userId,
                creditWalletAmount: paymentParams.amount,
              },
              (response: any) => {
                if (response === true) {
                  callback({
                    status: WalletStatuses.BALANCE_REFUNDED_TO_WALLET,
                    message: Messages.BALANCE_REFUNDED_TO_WALLET_MESSAGE,
                  });
                }
              }
            );
          }
        }
      );

      //console.log(PaymentTransactionId);

      // console.log(paymentReport);
    } catch (err) {
      callback(err);
    }
  }

  static async updateWalletBalance(
    updateWalletBalanceParams: {
      userId: string;
      creditWalletAmount: number;
    },
    callback: Function
  ) {
    try {
      const updateWalletReport = await WalletSchema.findOne({
        userId: updateWalletBalanceParams.userId,
      });
      if (updateWalletReport) {
        updateWalletReport.availableBalance =
          Number(updateWalletReport.availableBalance) +
          Number(updateWalletBalanceParams.creditWalletAmount);

        await updateWalletReport.save();
        callback(true);
      } else {
        callback(false);
      }
    } catch (err) {
      callback(err);
    }
  }

  static async reports(
    userId: string,

    callback: Function
  ) {
    const result = await ReportSchema.find({ userId: userId }).sort({
      createdAt: -1,
    });
    callback(result);
  }

  static async checkTransactionStatus(
    checkTranStatus: {
      merchantTranid: string;
      merchantLoginId: string;
      merchantpassword: string;
      superMerchantId: string;
      superMerchantPassword: string;
    },
    callback: Function
  ) {
    try {
      callback(true);
    } catch {
      callback(false);
    }
    // const api: IExternalApi = {
    //   url: `${ExternalApis.CHECK_TRANSACTION_STATUS}`,
    //   requestMethod: RequestMethod.POST,
    //   input: {},
    //   response: (res: any) => {},
    // };
    // Api.callApi(api);
  }

  static async collectPayRequest(
    collectPayParams: {
      payerVa: number;
      amount: string;
      note: string;
      collectByDate: Date;
      merchantId: number;
      merchantName: string;
      subMerchantId: number;
      subMerchantName: string;
      terminalId: number;
      merchantTranId: string;
      billNumber: string;
    },
    callback: Function
  ) {
    try {
      const collectUpiApi: IExternalApi = {
        url: `${ExternalApis.COLLECT_PAY}`,
        requestMethod: RequestMethod.POST,
        input: {},
        response: (res: any) => {},
        errorFunction: (error: any) => {},
      };
      Api.callApi(collectUpiApi);
      console.log(collectUpiApi.url, "-------------------------");
      callback("Heyyyyyyyyyyyyyyyyyyyyyy man");
    } catch {
      callback(false);
    }
  }
}

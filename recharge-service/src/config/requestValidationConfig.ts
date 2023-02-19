import { body, query } from "express-validator";
import { OperatorServiceTypes, PaymentType } from "../models";
import { RechargeService } from "../services/recharge.service";

const serviceTypes = [
  OperatorServiceTypes.PREPAID,
  OperatorServiceTypes.POSTPAID,
  OperatorServiceTypes.DATACARD,
  OperatorServiceTypes.BROADBAND,
  OperatorServiceTypes.DTH,
  OperatorServiceTypes.LANDLINE,
  OperatorServiceTypes.ELECTRICITY,
  OperatorServiceTypes.GAS,
  OperatorServiceTypes.INSURANCE,
  OperatorServiceTypes.DMR,
  OperatorServiceTypes.WATER,
  OperatorServiceTypes.PAN_TOKEN,
  OperatorServiceTypes.AEPS_ON,
  OperatorServiceTypes.LOAN_REPAYMENT,
  OperatorServiceTypes.GAS_CYLINDER,
  OperatorServiceTypes.EDUCATION_FEES,
  OperatorServiceTypes.GIFT_VOUCHER,
  OperatorServiceTypes.METRO_TRAIN,
  OperatorServiceTypes.CHALAN,
  OperatorServiceTypes.FASTAG,
  OperatorServiceTypes.LIFE_INSURANCE,
  OperatorServiceTypes.HOUSING_SOCIETY,
  OperatorServiceTypes.MUNICIPAL_TEXES,
  OperatorServiceTypes.HEALTH_INSURANCE,
  OperatorServiceTypes.CABLE_TV,
  OperatorServiceTypes.HOSPITAL,
  OperatorServiceTypes.SUBSCRIPTION,
  OperatorServiceTypes.PAYSERVICE,
  OperatorServiceTypes.OTT_SUBSCRIPTION,
  OperatorServiceTypes.IRCTC,
  OperatorServiceTypes.CLUB_AND_ASSOCIATION,
  OperatorServiceTypes.BROADBAND_POSTPAID,
  OperatorServiceTypes.LAND_LINE_POSTPAID,
  OperatorServiceTypes.EASY_RETURN,
];

export const requestValidationConfig = {
  report: [
    query("reportType").isIn([PaymentType.BILL_PAYMENT, PaymentType.RECHARGE]),
    query("serviceType").isIn(serviceTypes),
  ],
  doRecharge: [
    body("rechargeNumber").exists(),
    body("rechargeAmount").exists().isLength({ min: 1 }),
    body("circleCode").exists(),
    body("operatorCode").exists(),
  ],
  rechargeStatus: [body("transactionNumber").exists()],

  fetchOperators: [query("serviceType").isIn(serviceTypes)],

  billFetchFields: [body("operator").exists()],

  billFetch: [body("operator").exists(), body("requestData").exists()],
  planFetch: [
    body("planFetchNumber").exists(),
    body("circleCode").exists(),
    body("operatorCode").exists(),
  ],
  billPayment: [
    body("billPaymentNumber").exists(),
    body("operatorCode").exists(),
    // body("circleCode").exists(),
    body("amount").exists().isLength({ min: 1 }),
    body("landlineCaNumber").exists(),
    body("otherValue").exists(),
  ],
};

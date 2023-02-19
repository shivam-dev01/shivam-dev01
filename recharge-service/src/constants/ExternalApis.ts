import { Environment } from "./Environment";

export const ExternalApis = {
  DO_RECHARGE: `https://cyrusrecharge.in/api/recharge.aspx?memberid=${Environment.CYRUS_MEMBER_ID}&pin=${Environment.CYRUS_PIN}&number={rechargeNumber}&operator={Operator_Code}&circle={Circle_Code}&amount={AMOUNT}&usertx={txn}&format=json`,
  CHECK_RECHARGE_STATUS: `https://cyrusrecharge.in/api/rechargestatus.aspx?memberid=${Environment.CYRUS_MEMBER_ID}&pin=${Environment.CYRUS_PIN}&transid={transactionNumber}&format=json`,
  BILL_FETCH: `https://cyrusrecharge.in/api/BillFetch_Cyrus_BA.aspx`,
  PLAN_FETCH: `https://cyrusrecharge.in/API/CyrusPlanFatchAPI.aspx?APIID=${Environment.API_ID}&PASSWORD=${Environment.PASSWORD}&Operator_Code={Operator_Code}&Circle_Code={Circle_Code}&MobileNumber={planFetchNumber}&PageID=0&FORMAT=JSON`,
  BILL_PAYMENT: `https://cyrusrecharge.in/api/recharge.aspx?memberid=${Environment.CYRUS_MEMBER_ID}&pin=${Environment.CYRUS_PIN}&number={billPaymentNumber}&operator={operatorCode}&amount={amount}&usertx={txn}&account={landlineCaNumber}&othervalue={otherValue}&format=json`,
  WALLET_PAYMENT: `http://localhost:3012/wallet/payment`,
};

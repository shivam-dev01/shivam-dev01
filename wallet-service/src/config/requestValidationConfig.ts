import { body, query } from "express-validator";

export const requestValidationConfig = {
  report: [body("email").isEmail(), body("password").isLength({ min: 6 })],
  walletReport: [
    body("userId").exists(),
    body("availableBalance").exists(),
    body("usableBalance").exists(),
  ],
  getWallet: [body("userId").exists()],
  updateWalletBalance: [
    body("userId").exists(),
    body("creditWalletAmount").exists(),
  ],
  payment: [
    body("userId").exists(),
    body("amount").exists(),
    body("serviceType").exists(),
    body("paymentState").exists(),
    body("paymentType").exists(),
  ],

  checkTransactionStatus: [
    body("merchantTranid").exists(),
    body("merchantLoginId").exists(),
    body("merchantpassword").exists(),
    body("superMerchantId").exists(),
    body("superMerchantPassword").exists(),
  ],
  collectPayRequest: [
    body("payerVa")
      .isLength({ max: 250 })
      .isAlphanumeric(),
    body("amount")
      .exists()
      .isLength({ max: 20 })
      .isNumeric()
      .isDecimal(),
    body("note")
      .exists()
      .isLength({ max: 50 })
      .isAlphanumeric(),
    body("collectByDate").exists(),
    body("merchantId")
      .exists()
      .isLength({ max: 10 })
      .isNumeric(),
    body("merchantName")
      .exists()
      .isLength({ max: 50 })
      .isAlphanumeric(),
    body("subMerchantId")
      .exists()
      .isLength({ max: 10 })
      .isNumeric(),
    body("subMerchantName")
      .exists()
      .isLength({ max: 50 })
      .isAlphanumeric(),
    body("terminalId")
      .exists()
      .isLength({ max: 4 })
      .isNumeric(),
    body("merchantTranId")
      .exists()
      .isLength({ max: 20 })
      .isAlphanumeric(),
    body("billNumber")
      .exists()
      .isLength({ max: 50 })
      .isAlphanumeric(),
  ],
  generatePaymentId: [
    body("amount").exists()
  ]
};

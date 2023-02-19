import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface OperatorModel {
  Operator_Code: string;
  Operator_Name: string;
  Service_Type: OperatorServiceTypes;
}

export enum OperatorServiceTypes {
  PREPAID = "Prepaid-Mobile",
  POSTPAID = "Postpaid-Mobile",
  DATACARD = "Datacard",
  BROADBAND = "Broadband",
  DTH = "DTH",
  LANDLINE = "Landline",
  ELECTRICITY = "Electricity",
  GAS = "GAS",
  INSURANCE = "Insurance",
  DMR = "DMR",
  WATER = "Water",
  PAN_TOKEN = "PAN Token",
  AEPS_ON = "AEPS-on",
  LOAN_REPAYMENT = "Loan Repayment",
  GAS_CYLINDER = "Gas Cylinder",
  EDUCATION_FEES = "Education Fees",
  GIFT_VOUCHER = "GIFT Vourhcer",
  METRO_TRAIN = "METRO TRAIN",
  CHALAN = "CHALLAN",
  FASTAG = "Fastag",
  LIFE_INSURANCE = "Life Insurance",
  HOUSING_SOCIETY = "Housing Society",
  MUNICIPAL_TEXES = "Municipal Taxes",
  HEALTH_INSURANCE = "Health Insurance",
  CABLE_TV = "Cable TV",
  HOSPITAL = "Hospital",
  SUBSCRIPTION = "Subscription",
  PAYSERVICE = "PayService",
  OTT_SUBSCRIPTION = "OTT Subscription",
  IRCTC = "IRCTC",
  CLUB_AND_ASSOCIATION = "Clubs and Associations",
  BROADBAND_POSTPAID = "Broadband Postpaid",
  LAND_LINE_POSTPAID = "Landline Postpaid",
  EASY_RETURN = "Easy Return",
}

const schema = new Schema<OperatorModel>({
  Operator_Code: { type: String, required: true },
  Operator_Name: { type: String, required: true },
  Service_Type: { type: String, required: true },
});

export const OperatorSchema = model<OperatorModel>(
  IDatabaseSchema.OPERATOR,
  schema
);

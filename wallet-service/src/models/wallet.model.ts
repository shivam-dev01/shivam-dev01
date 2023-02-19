import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface WalletModel {
  userId: string;
  availableBalance: number;
  usableBalance: number;
  creditWalletAmount: number;
}

export enum serviceType {
  RECHARGE = "RECHARGE",
}

export enum PaymentState {
  INITIATED = "INITIATED",
  REFUND = "REFUND",
}

export enum PaymentType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

const schema = new Schema<WalletModel>({
  userId: { type: String, required: true },
  availableBalance: { type: Number, required: false },
  usableBalance: { type: Number, required: false },
  creditWalletAmount: { type: Number, required: false },
});

export const WalletSchema = model<WalletModel>(IDatabaseSchema.WALLET, schema);

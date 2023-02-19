import express from "express";
import walletRouter from "./wallet.route";
const router = express.Router();

router.use("/wallet/", walletRouter);

export default router;

import express from "express";
import rechargeRouter from "./recharge.route";
const router = express.Router();

router.use(rechargeRouter);

export default router;

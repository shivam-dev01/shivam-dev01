import express from "express";
import { Helper } from "./classes/Helper";
import { dbConnectionMiddleware } from "./config/dbConnection";
import { securityMiddleware } from "./config/jwt.config";
import { Environment } from "./constants/Environment";
import router from "./routes";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// setUpDbConnection(() => {});

app.use(securityMiddleware);

app.use(dbConnectionMiddleware);
app.use(router);

app.listen(Environment.PORT_NUMBER, () => {
  console.log(
    `This application is listening on port number:${Environment.PORT_NUMBER}`
  );
  // Helper.fetchingActivatedUser();
  // Helper.runCronJob();
});

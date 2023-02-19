import express from "express";
import { Helper } from "./classes/Helper";
import { setupDBConnection } from "./config/dbConnection";
const cors = require("cors");
const app = express();
import router from "./routes";
app.use(cors());
app.use(express.json());

app.use(router);

setupDBConnection();

app.listen(3010, () => {
  console.log("The application is listening on port 3010!");
  Helper.runCronJobs();
});

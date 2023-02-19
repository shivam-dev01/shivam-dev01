import express from "express";
import { setupDBConnection } from "./config/dbConnection";

const app = express();
import router from "./routes";

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(router);

setupDBConnection();

app.listen(3012, () => {
  console.log("The application is listening on port 3012!");
});

import mongoose from "mongoose";

export const setupDBConnection = () => {
  mongoose.connect(
    "mongodb+srv://nine-pay:ninepay%409tab.in@cluster0.34qgi.mongodb.net/nine_pay?authSource=admin&replicaSet=atlas-4ehvr3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Database connection established successfully");
  });
};

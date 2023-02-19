import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const setUpDbConnection = (dbName = "master-collection") => {
  return new Promise<void>((resolve, reject) => {
    mongoose.connection.close().then(() => {
      console.log("Disconnected Successfully...");
      mongoose
        .connect(
          `mongodb+srv://nine-pay:ninepay%409tab.in@cluster0.34qgi.mongodb.net/${dbName}`
        )
        .then(() => {
          console.log("Database connection established successfully.");
          resolve();
        })
        .catch((error) => {
          console.error("Connection error:-", error);
          reject(error);
        });
    });
  });
};

export const dbConnectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let databaseName = "master-collection"; // default database

  if (req.headers.companyId) {
    databaseName = req.headers.companyId
      ? req.headers.companyId.toString()
      : databaseName;
  }

  console.log("Initiating a new connection to the database:-", databaseName);

  await setUpDbConnection(databaseName);
  next();
};

import mongoose from "mongoose";

export const setupDBConnection = () => {
  mongoose.connect("mongodb://localhost:27017/sasdasa");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Database connection established successfully");
  });
};

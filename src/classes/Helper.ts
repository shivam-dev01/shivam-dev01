import { NextFunction, Response, Request } from "express";
import { Environment } from "../constants/Environment";
import { UserModel, UserType, UserSchema } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
const { scryptSync, randomBytes } = require("crypto");
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { userServices } from "../services/user.service";
import { decode, verify, sign } from "jsonwebtoken";
const clc = require("cli-color");
const cron = require("node-cron");

import { PaidUnpaidLeaveSchema } from "../models/paid-unpaid-leaves.model";

export class Helper {
  constructor() {}

  static hashPassword(password: string) {
    return scryptSync(password, Environment.PASSWORD_SALT_SECRET, 32).toString(
      "hex"
    );
  }
  static throwError(message: string, error?: any) {
    const errorObj = {
      error,
      message,
    };
    throw errorObj;
  }

  static async generateLoginToken(loginData: object) {
    let token = await sign(
      {
        ...loginData,
      },
      Environment.JWT_SECRET_TOKEN,
      { expiresIn: "8h" }
    );
    token = `Bearer ${token}`;
    return token;
  }

  static logger(message: any) {
    console.log(clc.greenBright(JSON.stringify(message)));
  }

  static stringToObjectId(objectId: string) {
    const mongoose = require("mongoose");
    return mongoose.Types.ObjectId(objectId);
  }

  static stringToObjectIdArray(objectIds: string[]) {
    return objectIds.map((each) => this.stringToObjectId(each));
  }

  static convertMongoObjectToJSObject(data: any) {
    data["id"] = data._id;
    delete data._id;
    delete data.__v;
    return data;
  }

  static getUserRole(res: any): UserType {
    return res.locals.userData.userRole;
  }

  static getUserId(res: any) {
    return res.locals.userData.id;
  }

  static protectedRoute(userData: UserModel) {
    return async (req: Request, res: Response, next: NextFunction) => {
      // if (
      //   decodedToken["userType"] &&
      //   roles.includes(decodedToken["userType"])
      // ) {
      //   res.locals.userData = decodedToken;
      //   next();
      // } else {
      //   unauthorizedResponse();
      //   return;
      // }
    };
  }

  static generateUUID() {
    return uuidv4();
  }

  static async sendEmail(
    userId: string,
    subject: string,
    htmlTemplate: string
  ) {
    const OAuth2 = google.auth.OAuth2;

    const user: any = await userServices.fetchUsers(userId);

    const createTransporter = async () => {
      const oauth2Client = new OAuth2(
        Environment.CLIENT_ID,
        Environment.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({
        refresh_token: Environment.REFRESH_TOKEN,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :(");
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: Environment.EMAIL,
          accessToken,
          clientId: Environment.CLIENT_ID,
          clientSecret: Environment.CLIENT_SECRET,
          refreshToken: Environment.REFRESH_TOKEN,
        },
      });
      return transporter;
    };

    //emailOptions - who sends what to whom
    const sendEmail = async (emailOptions) => {
      let emailTransporter = await createTransporter();
      const result = await emailTransporter.sendMail(emailOptions);
      console.log(result);
    };

    if (!user) {
      console.log("Email Send error ---", "User not found!");
      return;
    }

    try {
      sendEmail({
        subject: subject,
        html: htmlTemplate,
        to: user.emailId,
        from: Environment.EMAIL,
      });
    } catch (error) {
      console.log("Email Send error ---", error);
    }
  }

  static shuffleArray(array: any) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  static generatePassword(passwordLength: any) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(
      randPasswordArray.map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
    ).join("");
  }

  // static async fetchingActivatedUser(req: Request, res: Response) {
  //   console.log(req.headers, "--------------------");
  //   const result = await UserSchema.find({ isActive: true });
  //   result.map((each: any) => {
  //     console.log(each, "///////////");
  //   });
  // }

  // static async updatePaidLeave() {
  //   const result = await PaidUnpaidLeaveSchema.find();
  //   return result;
  // }

  // static runCronJob() {
  //   cron.schedule("*/10 * * * * *", async () => {
  //     const result = await this.updatePaidLeave();
  //     console.log(result, "Im running in every 10 seconds.");
  //   });
  // }
}

import { Environment } from "../constants/Environment";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
const path = require("path");
import AWS from "aws-sdk";

export enum PRESIGNED_URL_TYPE {
  READ = "read",
  WRITE = "write",
}

export class CloudStorage {
  bucket: any;
  constructor() {
    try {
      AWS.config.loadFromPath(
        path.join(__dirname, "..", "assets", "s3_bucket.json")
      );
      this.bucket = new AWS.S3();
      // this.bucket = new Storage({
      //   keyFilename: path.join(__dirname, "..", "assets", "cloud_storage.json"),
      // }).bucket(Environment.GOOGLE_BUCKET_NAME);

      // this.bucket.setCorsConfiguration([
      //   {
      //     maxAgeSeconds: [999999],
      //     method: ["*"],
      //     origin: ["*"],
      //     responseHeader: ["*"],
      //     "Access-Control-Allow-Origin": ["*"],
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  }

  async generateUrl(type: PRESIGNED_URL_TYPE, fileName: string) {
    const options = {
      version: "v4",
      action: type,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    let url = null;

    try {
      if (type === "read") {
        const params = { Bucket: "9tab-assets", Key: fileName };
        url = this.bucket.getSignedUrl("getObject", params);
        // [url] = await this.bucket.file(fileName).getSignedUrl(options);
      } else {
        fileName = this.generateFileName(fileName);
        const params = { Bucket: "9tab-assets", Key: fileName };
        url = this.bucket.getSignedUrl("putObject", params);
        // [url] = await this.bucket.file(fileName).getSignedUrl(options);
      }
    } catch (error) {
      console.log(error);
    }

    return {
      url,
      fileName,
    };
  }

  generateFileName(fileName: string) {
    return `${uuidv4()}/${fileName}`;
  }
}

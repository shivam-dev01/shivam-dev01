import { Injectable } from "@nestjs/common";
import { Environment } from "src/helpers/Enviornment";
const { Storage } = require("@google-cloud/storage");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
@Injectable()
export class GoogleBucketService {
  bucket: any;
  constructor() {
    try {
      this.bucket = new Storage({
        keyFilename: "../9pay_nodejs/src/assets/storage.json",
      }).bucket(Environment.GOOGLE_BUCKET_NAME);

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

  async getFiles(userId) {
    let [data] = await this.bucket.getFiles({ prefix: userId });
    data = this.generateOriginalFileNames(data, userId);
    return data;
  }

  async generateSignedUrl(type, fileName, userId) {
    const options = {
      version: "v4",
      action: type,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    if (type === "read") {
      return this.bucket.file(fileName).getSignedUrl(options);
    } else {
      return this.bucket
        .file(this.generateFileName(fileName, userId))
        .getSignedUrl(options);
    }
  }

  generateFileName(fileName, userId) {
    return `${userId}/${uuidv4()}/${fileName}`;
  }

  generateOriginalFileNames(files, userId) {
    const fileNames = [];
    const data = files.map((each) => {
      let fileName = each.name;

      fileName = fileName.split("/");
      fileName = fileName[fileName.length - 1];

      if (!fileNames.includes(fileName)) {
        fileNames.push(fileName);
      } else {
        const existFileName = each.name.split("/");

        fileName = `${existFileName[existFileName.length - 2]}-${
          existFileName[existFileName.length - 1]
        }`;

        fileNames.push(fileName);
      }

      return {
        displayName: fileName,
        originalName: each.name,
        createdAt: new Date(each.metadata.timeCreated),
      };
    });

    return data;
  }
}

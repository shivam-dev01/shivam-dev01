import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "src/core/guards/auth.guard";
import { GoogleBucketService } from "src/services/google-bucket/google-bucket.service";
import { JwtAuthBody, SignedUrl } from "../auth/dto/global.auth.dto";

@Controller("v1/vault")
export class VaultController {
  constructor(private googleBucketService: GoogleBucketService) {}

  @Get()
  async getUserVault(@Body() body: JwtAuthBody) {
    console.log(body);
    const userId = body.user.id;
    const result = await this.googleBucketService.getFiles(userId);
    return {
      message: "User vault retrieved successfully",
      result,
    };
  }

  @Post("uploadUrl")
  async uploadUrl(@Body() body: SignedUrl) {
    const userId = body.user.id;
    const result = {
      signedUrl: await this.googleBucketService.generateSignedUrl(
        "write",
        body.fileName,
        userId
      ),
    };
    return {
      message: "URL Generated Successfully",
      result,
    };
  }

  @Post("downloadUrl")
  async downloadUrl(@Body() body: SignedUrl) {
    const userId = body.user.id;
    const result = {
      signedUrl: await this.googleBucketService.generateSignedUrl(
        "read",
        body.fileName,
        userId
      ),
    };
    return {
      message: "URL Generated Successfully",
      result,
    };
  }
}

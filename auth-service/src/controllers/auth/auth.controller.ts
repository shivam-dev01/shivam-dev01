import { UsersService } from "../users/users.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  forgetPassword,
  Login,
  RegisterDto,
  ResetPassword,
  SignedUrl,
  VerifyOtp,
} from "./dto/global.auth.dto";
import { Helper } from "src/helpers/Helper";
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
import { GoogleBucketService } from "src/services/google-bucket/google-bucket.service";
const { Storage } = require("@google-cloud/storage");

@Controller("v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
    private googleBucketService: GoogleBucketService
  ) {}

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  @Get("test")
  testController() {
    return {
      message: "Auth service v7 running...",
      result: null,
    };
  }

  @Post("register")
  async register(@Body() registerBody: RegisterDto) {
    try {
      const data = await this.authService.sentOtp(registerBody.mobile);

      const userData = {
        mobile: registerBody.mobile,
        password: null,
      };

      const result = await this.authService.createUser(userData);
      console.log(result);
      return {
        message: "OTP sent successfully",
        result: data,
      };
    } catch (error) {
      return {
        message: "Error while sending OTP",
        result: null,
        error: error,
      };
    }
  }

  @Post("forget-password")
  async forgetPassword(@Body() forgetPasswordBody: forgetPassword) {
    try {
      const mobileNotExist = await this.userService.userNotExist(
        forgetPasswordBody.mobile
      );
      if (mobileNotExist.mobile===null) {
        return {
          message: "User is not registered with us.",
        };
      } else {
        const sendOTP = await this.authService.sentOtp(
          forgetPasswordBody.mobile
        );
        return {
          message: "OTP send successfully.",
          sendOTP,
          result: sendOTP
        };
      }
    } catch (error) {
      return {
        message: "Error while sending OTP",
        result: null,
        error: error,
      };
    }
  }

  @Post("verifyOtp")
  async verifyOtp(@Body() body: VerifyOtp) {
    try {
      const data = await this.authService.verifyOtp(
        body.otpValue,
        body.sessionId
      );

      const mobile = await this.userService.updateByMobile(body.mobile, {
        isMobileVerified: true,
      });

      this.authService.createWallet(mobile._id);

      return {
        message: "OTP verified successfully",
        result: data,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Wrong OTP Value. Please try again",
        result: null,
        error: error,
      };
    }
  }

  @Post("resetPassword")
  async resetPassword(@Body() body: ResetPassword) {
    try {
      await this.authService.verifyOtp(body.otpValue, body.sessionId);
      const hash = await Helper.hashPassword(body.password);

      const mobile = await this.userService.updateByMobile(body.mobile, {
        password: hash,
      });

      return {
        message: "Password reset successfully",
        result: null,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Wrong OTP Value. Pleae try again",
        result: null,
        error: error,
      };
    }
  }

  @Post("login")
  async login(@Body() body: Login) {
    try {
      let user: any = await this.userService.findByMobile(body.mobile);

      const isCorrectPassword = await Helper.checkPassword(
        body.password,
        user.password
      );

      if (isCorrectPassword) {
        user = {
          ...user._doc,
          ...(await this.authService.generateAuthToken(user)),
        };

        return {
          message: "Welcome to 9pay",
          result: user,
        };
      } else {
        throw new HttpException(
          "Wrong mobile number or password",
          HttpStatus.BAD_REQUEST
        );
      }
    } catch (error) {
      return {
        message: "Wrong OTP Value. Pleae try again",
        result: null,
        error: error,
      };
    }
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authService.remove(+id);
  }

  // Valut services

  @Get("vault")
  async upload() {
    try {
      // const blob = await storage
      //   .bucket("9pay_bucket")
      //   .file(files[0].originalname);
      // await storage.bucket("9pay_bucket").upload(files[0].buffer, {
      //   destination: "deepak",
      // });googleBucketService

      const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };

      console.log(options);

      // Get a v4 signed URL for uploading file
      // const url = await storage
      //   .bucket("9pay_bucket")
      //   .file("generated (1).pdf")
      //   .getSignedUrl(options);

      // const blobStream = await blob.createWriteStream({
      //   resumable: false,
      // });

      // blobStream.on();

      // await blobStream.end(files[0].buffer);

      // const data = await this.googleBucketService.getAllFiles();

      // // console.log(data);
      // return {
      //   message: "Bucket created successfully",
      //   result: data,
      // };
    } catch (error) {
      return {
        message: "Wrong OTP Value. Pleae try again",
        result: null,
        error: error,
      };
    }
  }

  @Post("getDownloadUrl")
  async downloadUrl(@Body() body: SignedUrl) {
    return {
      message: "Bucket created successfully",
      // result: await this.googleBucketService.generateSignedUrl(
      //   "read",
      //   body.fileName
      // ),
    };
  }
}

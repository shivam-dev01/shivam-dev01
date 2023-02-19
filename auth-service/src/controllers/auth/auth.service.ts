import { HttpModule, HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map, Observable } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  User,
  UserDocument,
  UserSchema,
} from "src/controllers/users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { IExternalApi, RequestMethod } from "src/interfaces/IExternalApi";
import { ExternalApis } from "src/helpers/ExternalApi";
import { Api } from "src/helpers/Api";

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async createUser(createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return data;
  }

  sentOtp(mobile): Promise<AxiosResponse<any>> {
    return this.httpService
      .get(
        `https://2factor.in/API/V1/59084fdf-f0cf-11e9-b828-0200cd936042/SMS/+91${mobile}/AUTOGEN`
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }
  verifyOtp(otpValue, sessionId): Promise<AxiosResponse<any>> {
    return this.httpService
      .get(
        `https://2factor.in/API/V1/${"59084fdf-f0cf-11e9-b828-0200cd936042"}/SMS/VERIFY/${sessionId}/${otpValue}`
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }

  async generateAuthToken(user) {
    const payload = { id: user._id, role: user.role, mobile: user.mobile };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async verifyAuthToken(token) {
    const result = await this.jwtService.verifyAsync(token);
    return result;
  }

  createWallet(userId: any) {
    const api: IExternalApi = {
      url: `${ExternalApis.CREATE_WALLET}`,
      requestMethod: RequestMethod.POST,
      input: {
        userId: userId,
        availableBalance: "0",
        usableBalance: "0",
      },
      response: (paymentRefundResponse: any) => {
        console.log(paymentRefundResponse);
      },
    };
    Api.callApi(api);
  }
}

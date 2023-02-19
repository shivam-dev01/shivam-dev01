import { Type } from "class-transformer";
import { IsObject, isString, Length, ValidateNested } from "class-validator";

class AuthUserObject {
  @Length(0, 9999)
  id: string;

  @Length(0, 9999)
  mobile: string;
}

export class JwtAuthBody {
  @IsObject()
  @ValidateNested()
  @Type(() => AuthUserObject)
  user!: AuthUserObject;
}

export class RegisterDto {
  @Length(10, 10)
  mobile: string;
}

export class forgetPassword{
  @Length(10, 10)
  mobile:string;
}

export class VerifyOtp {
  @Length(10, 10)
  mobile: string;

  @Length(6, 6)
  otpValue: string;

  sessionId: string;
}

export class ResetPassword {
  @Length(10, 10)
  mobile: string;

  @Length(6, 6)
  otpValue: string;

  sessionId: string;

  @Length(6, 6)
  password: string;
}

export class Login {
  @Length(10, 10)
  mobile: string;

  @Length(6, 25)
  password: string;
}

export class SignedUrl extends JwtAuthBody {
  @Length(0, 9999)
  fileName: string;
}

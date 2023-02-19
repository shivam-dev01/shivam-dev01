import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @Length(10, 10)
  mobile: string;

  @IsOptional()
  password: string;
}

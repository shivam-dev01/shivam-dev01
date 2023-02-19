import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument, UserSchema } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  findOne(id: string) {
    try {
      return this.userModel.find({ _id: id }).exec();
    } catch (error) {
      return new BadRequestException("Validation failed");
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateByMobile(mobile, data) {
    const result = await this.userModel
      .findOneAndUpdate({ mobile: mobile }, data)
      .exec();
    if (result === null) {
      throw new HttpException(`User is not registered.`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findByMobile(mobile) {
    const result = await this.userModel.findOne({ mobile: mobile }).exec();
    if (result === null) {
      throw new HttpException(`User not found.`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async userNotExist(mobile) {
    const result = await this.userModel.findOne({ mobile: mobile }).exec();
    if (result === null) {
      throw new HttpException(
        `User not registered with us.`,
        HttpStatus.NOT_FOUND
      );
    }
    return result;
  }
}

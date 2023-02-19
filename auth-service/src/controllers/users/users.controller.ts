import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/core/guards/auth.guard";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("profile")
  async findAll(@Req() req: Request) {
    const id = req.headers.userId as any;
    const data = await this.usersService.findOne(id);
    return {
      statusCode: 200,
      result: data,
    };
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      return new BadRequestException("Validation failed");
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}

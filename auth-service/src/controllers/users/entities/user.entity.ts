import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  role: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop()
  isMobileVerified: boolean;

  @Prop()
  mobile: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

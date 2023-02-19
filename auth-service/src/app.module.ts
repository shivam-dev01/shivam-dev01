import { AuthService } from "./controllers/auth/auth.service";
import { UsersService } from "./controllers/users/users.service";
import { ResponseInterceptor } from "./core/interceptors/response.interceptor";
import { HttpModule, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthController } from "./controllers/auth/auth.controller";
import { UsersController } from "./controllers/users/users.controller";
import { User, UserSchema } from "./controllers/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { Environment } from "./helpers/Enviornment";
import { GoogleBucketService } from "./services/google-bucket/google-bucket.service";
import { VaultController } from "./controllers/vault/vault.controller";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://nine-pay:ninepay%409tab.in@cluster0.34qgi.mongodb.net/nine_pay?authSource=admin&replicaSet=atlas-4ehvr3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
    ),
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: Environment.JWT_SECRET,
      signOptions: { expiresIn: "99999d" },
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    VaultController,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    UsersService,
    AuthService,
    GoogleBucketService,
  ],
})
export class AppModule {}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/controllers/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getArgs()[0].headers);

    const headers = context.getArgs()[0].headers;

    if (headers && headers["authorization"]) {
      let token = headers["authorization"];

      if (token.includes("Bearer ")) {
        token = token.replace("Bearer ", "");
        return this.authService.verifyAuthToken(token).then((result) => {
          console.log(result);
          headers["userId"] = result.id;
          return true;
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

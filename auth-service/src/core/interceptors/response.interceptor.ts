import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        console.log("hitting interceptor");

        context
          .switchToHttp()
          .getResponse()
          .status(
            data && data.error && data.error.status
              ? data.error.status
              : context.switchToHttp().getResponse().statusCode
          );

        return {
          statusCode:
            data && data.error && data.error.status
              ? data.error.status
              : context.switchToHttp().getResponse().statusCode,
          message:
            data && data.error && data.error.message
              ? data.error.message
              : data.message,
          result: data.result,
          error: data.error ? data.error : null,
        };
      })
    );
  }
}

import { Response } from "express";

export class HttpResponse {
  constructor(
    private expressResponseObj: Response,
    private message: string,
    private result: any = "",
    private statusCode: number = 200
  ) {}

  sendResponse() {
    this.expressResponseObj.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
      result: this.result,
    });
  }
}

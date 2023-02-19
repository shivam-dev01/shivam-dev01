export interface IExternalApi {
  url: string;
  requestMethod: RequestMethod;
  input: object;
  response: Function;
  errorFunction?: Function;
  endFunction?: Function;
  hideResponseMsg?: boolean;
  headers?: IExternalApiHeaders[];
}

export interface IExternalApiHeaders {
  key: string;
  value: string;
}

export enum RequestMethod {
  GET,
  POST,
  PUT,
  DELETE,
}

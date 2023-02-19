import axios from "axios";
import { IExternalApi, RequestMethod } from "../interfaces/IExternalApi";

export class Api {
  static callApi(apiParams: IExternalApi) {
    const url = apiParams.url;

    let axiosInstance = null;
    switch (apiParams.requestMethod) {
      case RequestMethod.GET:
        axiosInstance = axios.get(url);
        break;

      case RequestMethod.POST:
        axiosInstance = axios.post(url, apiParams.input);
        break;

      case RequestMethod.PUT:
        axiosInstance = axios.put(url, apiParams.input);
        break;

      case RequestMethod.DELETE:
        axiosInstance = axios.delete(url, apiParams.input);
        break;

      default:
        axiosInstance = axios.get(url, apiParams.input);
        break;
    }

    axiosInstance
      .then((response) => {
        if (apiParams.response) {
          if (response && response.data) {
            apiParams.response(response.data);
          }
        }
      })
      .catch((error) => {
        if (apiParams.errorFunction) {
          apiParams.errorFunction(error);
        }
      })
      .then(() => {
        if (apiParams.endFunction) {
          apiParams.endFunction();
        }
      });
  }
}

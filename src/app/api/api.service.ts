import { catchError, lastValueFrom, map } from "rxjs";

import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class ApiService {
  private logger: Logger = new Logger(ApiService.name);

  constructor(private readonly httpService: HttpService) {
    this.logger.debug({
      message: "Entering constructor of api service",
    });
  }

  async call(url: string, method: string, data?: any, headers?: any) {
    try {
      this.logger.debug({
        message: "Entering call of api service",
        url: url,
        data: data,
        method: method,
        headers: headers,
      });

      const request = this.httpService
        .request({
          url: url,
          method: method,
          data: data,
          headers: headers,
        })
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw {
              statusCode: 401,
              error: "API not available",
              data: null,
            };
          }),
        );

      const res = await lastValueFrom(request);

      this.logger.log({
        message: "Api call response",
        res: res,
        url: url,
        data: data,
        method: method,
        headers: headers,
      });

      if (res.error) {
        throw res.error;
      }

      return res.data;
    } catch (error) {
      this.logger.error({
        message: "Error calling api",
        error: error,
        url: url,
        data: data,
        method: method,
        headers: headers,
      });
      throw error;
    }
  }
}

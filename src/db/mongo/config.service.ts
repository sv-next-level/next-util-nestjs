import { Injectable, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";

export const createMongooseConfigServiceClass = (
  connectionName: string,
): Type<MongooseOptionsFactory> => {
  @Injectable()
  class MongooseConfigService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions():
      | MongooseModuleOptions
      | Promise<MongooseModuleOptions> {
      const uri = this.configService.get(`${connectionName}.dbUri`);

      return {
        uri,
      };
    }
  }

  return MongooseConfigService;
};

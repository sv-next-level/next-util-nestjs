import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, Type } from "@nestjs/common";

export const createMongooseConfigServiceClass = (
  connectionName: string
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

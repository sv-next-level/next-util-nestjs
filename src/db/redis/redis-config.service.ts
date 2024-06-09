import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RedisService {
  private logger: Logger = new Logger(RedisService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    this.logger.debug({
      message: "Entering constructor of redis service",
    });
  }

  async get(key: string): Promise<unknown> {
    try {
      this.logger.debug({
        message: "Entering get of redis service",
        key: key,
      });

      const value = await this.cache.get(key);
      this.logger.log({
        message: "Redis get response",
        key: key,
      });

      return value;
    } catch (err) {
      this.logger.error({
        message: "Error in get of redis service",
        error: err.message,
        key: key,
      });
      throw err;
    }
  }

  async set(key: string, value: unknown, ttls: number = 0): Promise<void> {
    try {
      this.logger.debug({
        message: "Entering set of redis service",
        key: key,
      });

      const ttl: number = ttls * 1000;
      await this.cache.set(key, value, ttl);
      this.logger.log({
        message: "Redis set response",
        key: key,
        ttl: ttl,
      });
    } catch (err) {
      this.logger.error({
        message: "Error in set of redis service",
        error: err.message,
        key: key,
      });
      throw err;
    }
  }

  async del(key: string): Promise<void> {
    try {
      this.logger.debug({
        message: "Entering del of redis service",
        key: key,
      });

      await this.cache.del(key);
      this.logger.log({
        message: "Redis del response",
        key: key,
      });
    } catch (err) {
      this.logger.error({
        message: "Error in del of redis service",
        error: err.message,
        key: key,
      });
      throw err;
    }
  }

  async mget(keys: string[]): Promise<unknown[]> {
    try {
      this.logger.debug({
        message: "Entering mget of redis service",
        keys: keys,
      });

      const value = await this.cache.store.mget(...keys);
      this.logger.log({
        message: "Redis mget response",
        value_length: value.length,
        keys: keys,
      });

      return value;
    } catch (err) {
      this.logger.error({
        message: "Error in mget of redis service",
        error: err.message,
        keys: keys,
      });
      throw err;
    }
  }

  async mset(args: [string, unknown][], ttls: number = 0): Promise<void> {
    try {
      this.logger.debug({
        message: "Entering mset of redis service",
        args_lenght: args.length,
      });

      const ttl: number = ttls * 1000;
      await this.cache.store.mset(args, ttl);
      this.logger.log({
        message: "Redis mset response",
        args_lenght: args.length,
        ttl: ttl,
      });
    } catch (err) {
      this.logger.error({
        message: "Error in mset of redis service",
        error: err.message,
        args_lenght: args.length,
      });
      throw err;
    }
  }

  async mdel(keys: string[]): Promise<void> {
    try {
      this.logger.debug({
        message: "Entering mdel of redis service",
        keys: keys,
      });

      await this.cache.store.mdel(...keys);
      this.logger.log({
        message: "Redis mdel response",
        keys: keys,
      });
    } catch (err) {
      this.logger.error({
        message: "Error in mdel of redis service",
        error: err.message,
        keys: keys,
      });
      throw err;
    }
  }

  async keys(pattern?: string): Promise<string[]> {
    try {
      this.logger.debug({
        message: "Entering keys of redis service",
        pattern: pattern,
      });

      const keys = await this.cache.store.keys(pattern);
      this.logger.log({
        message: "Redis keys response",
        keys_length: keys.length,
        pattern: pattern,
      });

      return keys;
    } catch (err) {
      this.logger.error({
        message: "Error in keys of redis service",
        error: err.message,
        keys: pattern,
      });
      throw err;
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      this.logger.debug({
        message: "Entering ttl of redis service",
        key: key,
      });

      let ttl: number = await this.cache.store.ttl(key);
      this.logger.log({
        message: "Redis ttl response",
        key: key,
        ttl: ttl,
      });

      if (ttl >= 0) {
        ttl = ttl / 1000;
      } else {
        // no limit means -1
        ttl = 0;
      }

      return ttl;
    } catch (err) {
      this.logger.error({
        message: "Error in ttl of redis service",
        error: err.message,
        key: key,
      });
      throw err;
    }
  }

  async reset(): Promise<void> {
    try {
      this.logger.debug({
        message: "Entering reset of redis service",
      });

      await this.cache.reset();
      this.logger.log({
        message: "Redis reset response",
      });
    } catch (err) {
      this.logger.error({
        message: "Error in reset of redis service",
        error: err.message,
      });
      throw err;
    }
  }
}

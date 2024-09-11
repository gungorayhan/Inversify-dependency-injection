import { Container } from "inversify";
import { IRedisService } from "../../interfaces/redis";
import { CacheMiddleware } from "../../middleware/cache";
import { INTERFACE_TYPE } from "../../utils";
import { RedisService } from "../../libs/redis";


const cachedContainer = new Container()

cachedContainer.bind<IRedisService>(INTERFACE_TYPE.Redis).to(RedisService)
cachedContainer.bind(INTERFACE_TYPE.CachedMiddleware).to(CacheMiddleware)

export {cachedContainer}
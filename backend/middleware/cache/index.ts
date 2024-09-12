import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { INTERFACE_TYPE } from "../../utils";
import { IRedisService } from "../../interfaces/redis";

@injectable()
export class CacheMiddleware {
    private redis: IRedisService;

    constructor(@inject(INTERFACE_TYPE.Redis) redis: IRedisService) {
        this.redis = redis;
    }

    async handle(req: Request, res: Response, next: NextFunction) {
        const key = req.originalUrl;

        try {
            const cachedData = await this.redis.get(key);
            if (cachedData) {
                try {
                    // Eğer cachedData JSON formatında ise parse et
                    const parsedData = JSON.parse(cachedData);
                    // console.log(parsedData)
                    return res.json(parsedData); // JSON verisini döndür
                } catch (e) {
                    // Eğer parse edilemiyorsa string formatında return et
                    // console.log(cachedData)
                    return res.json(cachedData);
                }
            }
        } catch (err) {
            console.error("Redis'ten veri alınırken hata oluştu:", err);
        }

        // Cevap gönderme işlemi öncesinde cache'e veriyi kaydetmek için sendResponse'u override et
        const sendResponse = res.json.bind(res);

        res.json = (body) => {
            const cacheValue = typeof body === "object" ? JSON.stringify(body) : body;
            this.redis.set(key, cacheValue, 3600); // 1 saat boyunca cache'le
            return sendResponse(body); // Orijinal cevabı döndür
        };

        next();
    }
}
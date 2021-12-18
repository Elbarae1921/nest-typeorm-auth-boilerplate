import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: Logger) {
        this.logger.setContext('HTTP');
    }

    use(request: Request, response: Response, next: NextFunction) {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || 'N/A';
        const startHrTime = process.hrtime.bigint();

        response.on('finish', () => {
            const elapsedHrTimeInMs = (
                Number(process.hrtime.bigint() - startHrTime) / 1000000
            ).toFixed(2);
            const { statusCode } = response;
            const contentLength = response.get('Content-Length');
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength}B ${elapsedHrTimeInMs}ms - ${userAgent} ${ip}`
            );
        });

        next();
    }
}

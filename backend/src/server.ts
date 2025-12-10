import http from "node:http";
import { createApp } from "./app";
import { assertDatabaseConnection } from "./db/db";
import { logger } from "./lib/logger";
import env from "./config/env";




async function bootstrap() {
 
    // Application initialization logic here

    try {

        await assertDatabaseConnection();

        const app = createApp();
        const server = http.createServer(app);

        const PORT = Number(env.PORT) || 5000;

        server.listen(PORT, () => {
            logger.info(`Server is running on port http://localhost:${PORT}`);
        });

        
    } catch (error) {
        logger.error('Failed to start the server: ' + (error as Error).message);
    }
}

bootstrap();
import App from "./server/app";
import http from "http";
import db from "./server/db";
import logger from "./common/logger";
import env from "./common/config/env";

const start = async () => {
    try {
        const app = new App();
        
        await db.connect();
        const appServer = app.getServer();
        const httpServer = http.createServer(appServer);
        logger.message("📦  MongoDB Connected!");

        httpServer.listen(env.port);
        httpServer.on("listening", () =>
            logger.message(
                `🚀  ${env.service_name} running in ${env.app_env}. Listening on ` +
                    env.port
            )
        );
    } catch (error) {
        logger.error(error, "Fatal server error");
    }
};

start();

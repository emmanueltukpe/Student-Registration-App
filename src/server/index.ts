import App from "./app";
import http from "http";
import db from "./db";
import logger from "../common/logger";
import env from "../common/config/env";

const start = async () => {
    try {
        const app = new App();
        const appServer = app.getServer();
        const httpServer = http.createServer(appServer);

        await db.connect();
        console.log("📦  MongoDB Connected!");

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

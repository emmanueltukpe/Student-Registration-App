import express, { Application } from "express";
import responseTime from "response-time";
import cors from "cors";
import helmet from "helmet";
import loggerMiddleware from "./middleware/requestLogger";
import jsend from "./middleware/jsend";
import { logResponseBody } from "./middleware/logResponseBody";
export default class App {
    private server: Application;

    constructor() {
        this.server = express();

        this.registerMiddlewares();
        this.registerHandlers();
    }

    /**
     * Registers middlewares on the application server
     */
    private registerMiddlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));

        this.server.disable("x-powered-by");
        this.server.use(helmet());
        this.server.use(cors());

        this.server.use(responseTime());

        this.server.use(loggerMiddleware);
        this.server.use(logResponseBody);
        this.server.use(jsend);
    }

    /**
     * Registers utility handlers
     */
    private registerHandlers() {
        this.server.get("/", (req, res) => {
            res.status(200).json({ Welcome: "Stduents of Godolkin" });
        });

        this.server.use((req, res, next) => {
            res.status(404).send("Whoops! Route doesn't exist.");
        });
    }

    /**
     * Applies all routes and configuration to the server, returning the express application server.
     */
    getServer() {
        return this.server;
    }
}

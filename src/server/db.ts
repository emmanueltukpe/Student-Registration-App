import mongoose, { Connection, ConnectOptions } from "mongoose";
import env from "../common/config/env";

/**
 * Database class. Handles MongoDB database connections.
 */
export class DB {
    connection: Connection;

    /**
     * Connects to a MongoDB server and subsequently opens a MongoDB connection
     */
    async connect() {
        const options: ConnectOptions = {
            dbName: env.db_name,
            autoCreate: true
        };
        await mongoose.connect(env.mongodb_url, options);

        this.connection = mongoose.connection;
    }

    /**
     * Closes all connections in the Mongoose connection pool:
     */
    async disconnect() {
        await mongoose.disconnect();
    }
}

export default new DB();

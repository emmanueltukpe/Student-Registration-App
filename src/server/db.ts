import mongoose, { Connection } from 'mongoose';
import env from '../common/config/env';

/**
 * Database class. Handles MongoDB database connections.
 */
export class DB {
  connection: Connection;

  /**
   * Connects to a MongoDB server and subsequently opens a MongoDB connection
   */
  async connect() {
    await mongoose.connect(env.mongodb_url, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      poolSize: 10,
      // dbName: env.db_name
    });

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
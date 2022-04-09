import mongoose from "mongoose";
import winston from "winston";
import path from "path";
import express from "express";
import http from "http";

export class Singleton {
  static instance: Singleton;
  id: number;

  constructor(id: number) {
    this.id = id;

    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

/** The Client
 * All uses of the singleton point to the same original object
 */
const OBJECT1 = new Singleton(1); // setting its id property to 1
const OBJECT2 = new Singleton(2); // setting its id property to 2
console.log(OBJECT1 === OBJECT2); // = true
console.log(OBJECT1.id); // returns 1
console.log(OBJECT2.id); // returns 1

/**
 * A Mongoose Example
 */
class ServerGlobal {
  private static _instance: ServerGlobal;
  private readonly _logger: winston.Logger;

  private constructor() {
    this._logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(__dirname, "../logs.log"),
          level: "info",
        }),
      ],
    });

    mongoose
      .connect(process.env.DB_ENDPOINT!)
      .then(() =>
        this._logger.info("MongoDB connection established successfully")
      )
      .catch((e: mongoose.MongooseError) =>
        this._logger.error(`MongoDB connection failed with error: ${e}`)
      );
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new ServerGlobal();
    return this._instance;
  }

  public get logger() {
    return this._logger;
  }
}

const app = express();
app.set("port", 9999);

const server = http.createServer(app);
const instance = ServerGlobal.getInstance();
instance.logger.info(`Server is running on port ${process.env.PORT}`);

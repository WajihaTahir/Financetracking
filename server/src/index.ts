//MBsI2kjQplL4rRI8;
import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app: Express = express();
const port = process.env.PORT || 3000;

console.log("Connection String:", process.env.CONNECTION_STRING);

app.use(express.json());

const mongoURI: string = process.env.CONNECTION_STRING || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("connected to mongoDb"))
  .catch((error) => console.log("Failed to connect to mongodb", error));

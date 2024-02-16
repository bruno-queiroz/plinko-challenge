import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getBet } from "./controllers/getBet";

dotenv.config();

export default function () {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/bet", getBet);

  return app;
}

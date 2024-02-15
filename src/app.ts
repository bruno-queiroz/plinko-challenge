import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export default function () {
  const app = express();

  app.use(express.json());
  app.use(cors());

  return app;
}

import makeApp from "./app";
import mongoose from "mongoose";

import { connectDb } from "./db/connect";

const port = 3000;

const app = makeApp(connectDb);

mongoose.connection.on("connected", () => {
  app.listen(port, () => {
    [console.log("server running at", port)];
  });
});

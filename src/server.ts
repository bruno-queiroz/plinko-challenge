import makeApp from "./app";
import mongoose from "mongoose";

import { connectDb } from "./db/connect";
import { createDummyUserIfNotCreated } from "./utils/createDummyUserIfNotCreated";

const port = process.env.PORT || 3000;

const app = makeApp(connectDb);

mongoose.connection.on("connected", () => {
  app.listen(port, async () => {
    await createDummyUserIfNotCreated();

    console.log("server running at", port);
  });
});

import makeApp from "./app";

const port = 3000;

const app = makeApp();

app.listen(port, () => {
  [console.log("server running at", port)];
});

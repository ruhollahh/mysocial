import http from "http";
import app from "./app.js";
import { mongoConnect } from "./services/mongo.js";

const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
  } catch (err) {
    console.error(err);
  }

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();

import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected.");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  return await mongoose.connect(MONGO_URI);
}

async function mongoDisconnect() {
  return await mongoose.disconnect();
}

export { mongoConnect, mongoDisconnect };

import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB";
import { indexRouter } from "./routes/index";
import { authRouter } from "./routes/auth";

const app = express();
const result = dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

if (result.error) {
  throw result.error;
}

(async function () {
  await connectDB(MONGO_URI);
})();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

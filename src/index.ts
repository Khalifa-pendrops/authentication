import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.routes";
// import logRequest from "./middleware/loggingMiddleware";
// import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(logRequest);
// app.use(cors());

app.use("/api", router);

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected successfully to MongoDB database!");
  })
  .catch((error) => {
    console.error(`Error connecting MongoDB database: ${error}`);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

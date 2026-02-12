import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactroute from "./routes/contactroute.js";

dotenv.config();
console.log("MONGO_URI from env:", process.env.MONGO_URI?.slice(0, 40) + "...");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/contacts", contactroute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server is running on port", process.env.PORT || 5000),
    );
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

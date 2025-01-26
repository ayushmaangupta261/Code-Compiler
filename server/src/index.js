import express from "express";
import dotenv from "dotenv";
import connectToDB from "./utils/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
console.log("PORT from env:", process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectToDB();
  console.log(`Server is running on port ${port}`);
});

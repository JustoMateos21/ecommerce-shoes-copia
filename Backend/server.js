import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
const app = express();

dotenv.config();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api", (req, res) => {
  res.send("funcionando");
});

app.use("/api/seed", seedRouter);

const port = process.env.PORT || 5000;
app.listen(`${port}`, () => {
  console.log(`listening on port`);
});

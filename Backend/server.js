import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
import path from "path";
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("funcionando");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);

app.get("*", (req, res) => {
  res.send("not found");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(`${port}`, () => {
  console.log(`listening on port`);
});

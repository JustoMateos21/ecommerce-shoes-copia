import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";
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

app.use(function (req, res, next) {
  res
    .status(404)
    .render("404_error_template", { title: "Sorry, page not found" });
});

const port = process.env.PORT || 5000;
app.listen(`${port}`, () => {
  console.log(`listening on port`);
});

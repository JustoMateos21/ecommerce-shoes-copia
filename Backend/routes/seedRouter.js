import express from "express";
import shoes from "../shoesData.js";
import Product from "../models/productModel.js";
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(shoes);
  res.send(createdProducts);
});

export default seedRouter;

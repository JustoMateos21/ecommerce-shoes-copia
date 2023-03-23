import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();

  res.send(products);
});

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const price = query.price || "";
    const category = query.category || "";
    const rating = query.rating || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    console.log(priceFilter, queryFilter, categoryFilter, ratingFilter.rating);
    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    res.send(products);
  })
);

productRouter.get("/categories", async (req, res) => {
  const products = await Product.find();
  let categories = [];
  products.forEach((p) => {
    if (!categories.includes({ category: p.category })) {
      categories = [...categories, { category: p.category }];
    }
  });
  res.send(categories);
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;

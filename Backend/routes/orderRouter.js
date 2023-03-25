import express from "express";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod || "Mercado Pago",
      itemsPrice: req.params.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice || 0,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
      isPaid: false,
      isDelivered: false,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  } catch (e) {
    console.log(JSON.stringify(e.message));
  }
});

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(`${req.params.orderId}`);
      res.send(order);
    } catch (e) {
      console.log(JSON.stringify(e.message));
    }
  })
);

export default orderRouter;

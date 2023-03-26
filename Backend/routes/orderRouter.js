import express from "express";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import PaymentController from "../Controllers/PaymentController.js";
import mongoose from "mongoose";
import axios from "axios";
const orderRouter = express.Router();

let orderIdentification = "";
orderRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
      })),
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
    orderIdentification = order._id;
  } catch (e) {
    console.log(JSON.stringify(e.message));
  }
});

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      res.send(order);
    } catch (e) {
      console.log(JSON.stringify(e.message));
    }
  })
);

orderRouter.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.send(order);
  } catch (e) {
    console.log(e);
  }
});

orderRouter.get("/:id/payment", async (req, res) => {
  // let orderItems = [];
  const orderItems = [];
  try {
    const order = await Order.findById(req.params.id);
    order.orderItems.forEach((item) => {
      orderItems.push({
        title: item.name,
        picture_url: item.image,
        quantity: item.quantity,
        unit_price: item.price,
      });
    });
  } catch (e) {
    console.log(e);
  }

  const PaymentInstance = new PaymentController(
    new (class PaymentService {
      async createPayment() {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const body = {
          user_email: "test_user_1790345282@testuser.com",
          user_id: req.params.userId,
          items: orderItems,
          back_urls: {
            failure: "",
            pending: "",
            success: "",
          },
          external_reference: `${orderIdentification}`,
          notification_url: `https://3305-181-98-250-176.sa.ngrok.io/api/orders/payment/status`,
        };

        const payment = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          },
        });

        return payment.data;
      }
    })()
  );
  try {
    PaymentInstance.getPaymentLink(req, res);
  } catch (e) {
    console.log(e);
  }
});

orderRouter.post("/payment/status", async (req, res) => {
  const { body, query } = req;
  if (body.data.id !== "undefined") {
    try {
      const { data } = await axios.get(
        `https://api.mercadopago.com/v1/payments/${body.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
          },
        }
      );
      if (
        data.external_reference === orderIdentification &&
        data.status === "approved"
      ) {
        console.log(orderIdentification);

        const order = await Order.findById(orderIdentification);
        order.isPaid = true;
        const updatedOrder = await order.save();
        console.log("orderUPDATED");
      }
    } catch (e) {
      console.log(e);
    }
  }
  console.log(body, query);
  res.send(body);
});

export default orderRouter;

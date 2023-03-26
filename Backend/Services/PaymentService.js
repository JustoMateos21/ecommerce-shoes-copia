import Axios from "axios";

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_1790345282@testuser.com",
      items: [
        {
          title: "Dummy Title",
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 10,
        },
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success",
      },
    };

    const payment = await Axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESSTOKEN}`,
      },
    });

    return payment.data;
  }
}

export default PaymentService;

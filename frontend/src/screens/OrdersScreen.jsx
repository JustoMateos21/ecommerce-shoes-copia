import axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import { StoreContext } from "../store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrdersScreen = () => {
  const { state } = useContext(StoreContext);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    console.log(orders);

    console.log(userInfo.token);
    const getOrders = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(error);
      } catch (e) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
        console.log(e);
      }
    };
    getOrders();
  }, [userInfo]);

  return (
    <div className="flex flex-col pt-14 items-center ">
      <h2 className="pt-1 pb-4 text-2xl text-[#fff]">Orders</h2>
      {orders &&
        orders.map((o) => (
          <div
            key={o._id}
            className="flex mt-2 flex-col rounded-md p-4 bg-slate-700 bg-opacity-40"
          >
            <p className="text-gray-100 pt-1">Order number: {o._id}</p>

            <p className="text-gray-100 pt-1">
              Payment Status:{" "}
              <b className={!o.isPaid ? "text-red-300" : "text-green-300"}>
                {o.isPaid === false ? "not payed" : "payed"}
              </b>
            </p>

            <p className="text-gray-100 pt-1">
              Delivery Status:{" "}
              <b className={!o.isDelivered ? "text-red-300" : "text-green-300"}>
                {o.isDelivered === false ? "not delivered" : "delivered"}
              </b>
            </p>

            <p className="text-gray-100 pt-1">Items: </p>
            {o.orderItems.map((product) => (
              <p key={product._id} className="text-white">
                {product.name}
              </p>
            ))}
          </div>
        ))}
    </div>
  );
};

export default OrdersScreen;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";
import { RxMinusCircled } from "react-icons/rx";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";

const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);

  const [total, setTotal] = useState();
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    let qtys = [];
    for (let i = 0; i < cartItems.length; i++) {
      qtys.push(cartItems[i].price * cartItems[i].quantity);
    }
    let initialValue = 0;
    setTotal(
      qtys.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      )
    );
  }, [cartItems]);

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const updateCartHandler = async (item, action) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity =
      action === "add"
        ? existItem
          ? existItem.quantity + 1
          : 1
        : existItem
        ? existItem.quantity - 1
        : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const clearCartHandler = () => {
    ctxDispatch({
      type: "CART_CLEAR",
    });
  };

  return (
    <div className="flex flex-col  min-h-screen items-center pl-3 pr-3  pt-14 min-w-screen">
      <ProgressBar percentage={50} />
      {cartItems.map((item) => (
        <div
          className=" grid grid-cols-2 border-b border-b-slate-500 pb-2 rounded-b-md"
          key={item._id}
        >
          <div className="flex drop-shadow-md  w-36 bg-slate-400 bg-opacity-20 rounded-lg">
            <img
              src={item.image}
              alt="product"
              className="  object-scale-down"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-md text-white pt-2 pb-2">{item.name}</p>
            <div className="flex w-[90%] bg-slate-400 rounded-md p-2 items-center justify-around">
              <RxMinusCircled
                cursor={"pointer"}
                size={20}
                onClick={() => updateCartHandler(item, "remove")}
              />
              <span>
                <p>{item.quantity}</p>
              </span>
              <AiFillPlusCircle
                cursor={"pointer"}
                size={20}
                onClick={() => updateCartHandler(item, "add")}
              />
            </div>
            <p className="text-lg text-white pt-2">${item.price}</p>
            <BsTrash
              color="#f1f1f1"
              cursor={"pointer"}
              size={20}
              onClick={() => removeItemHandler(item)}
            />
          </div>
        </div>
      ))}

      {cartItems.length ? (
        <div className="flex mt-4 flex-col bg-slate-300 rounded-md p-5 items-center">
          <p className="pb-2">Total ${total}</p>
          <Link
            className="rounded-lg font-semibold bg-slate-400 flex w-40 h-10 p-1 items-center justify-center text-[#3f3f3f]"
            to={"/delivery"}
          >
            Proceed To Checkout
          </Link>
          <button
            className="bg-red-400 text-white  mt-2 p-2 rounded-md "
            onClick={clearCartHandler}
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <div>
          <p className="text-white text-lg">
            There is no items in you cart,{" "}
            <Link className="text-[#9596b8]" to={"/shop"}>
              Continue Shopping{" "}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CartScreen;

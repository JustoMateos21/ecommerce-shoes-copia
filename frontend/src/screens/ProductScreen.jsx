import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Stars from "../Components/Stars";
import { StoreContext } from "../store";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const location = useLocation();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/${location.state.productid}`
        );
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProduct();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });

    console.log(cartItems);
  };

  return (
    <div className="container pt-14 mx-auto py-4">
      <div className="bg-pink-100 bg-opacity-10 p-4 rounded-md shadow-md">
        <img className="w-1/4 rounded-md" src={product.image} alt="shoe" />
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">{product.name} </h3>
          <div className="">
            <span className="text-sm mr-2">
              <button
                className="px-2 py-1 rounded-md bg-pink-300 hover:bg-pink-400 text-white text-sm"
                onClick={() => addToCartHandler(product)}
              >
                Add to cart
              </button>
            </span>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-700">{product.description}</p>
          <Stars stars={product.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;

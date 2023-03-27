import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFilter, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCartPlus, BsChevronLeft } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../store";
import axios from "axios";

const prices = [
  {
    name: "$10 to $25",
    value: "10-25",
  },
  {
    name: "$25 to $50",
    value: "25-20",
  },
  {
    name: "$50 to $200",
    value: "50-200",
  },
];

const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/products/categories");
      setCategories(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;

    return {
      pathname: "/search",
      search: `?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}`,
    };
  };

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

  useEffect(() => {
    // if (componentDidMount.current === false) {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/search`, {
          params: {
            category: category,
            query: query,
            price: price,
            rating: rating,
          },
        });
        setProducts(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
    getCategories();

    // componentDidMount.current = false;
  }, [category, rating, price]);

  const closeMenu = () => {
    setShowFilterMenu(false);
  };

  return (
    <div className="flex flex-col  pt-12">
      <div className="flex">
        <AiOutlineFilter
          onClick={() => setShowFilterMenu(true)}
          size={25}
          cursor="pointer"
          color="#f2f2f2"
        />
        {showFilterMenu && (
          <div className="flex pl-6 flex-col w-[70%] h-screen p-4 absolute bg-[#D9D9D9] rounded-sm ">
            <BsChevronLeft cursor="pointer" onClick={closeMenu} />
            <div className="flex flex-col p-2">
              <h3 className="text-lg font-medium">Categories</h3>
              <Link
                className="pt-1"
                onClick={closeMenu}
                to={getFilterUrl({ category: "all" })}
              >
                All
              </Link>

              {categories.length ? (
                categories.map((x) => (
                  <Link
                    key={x.category}
                    onClick={closeMenu}
                    to={getFilterUrl({ category: x.category })}
                    className="pt-1 "
                  >
                    {x.category}
                  </Link>
                ))
              ) : (
                <AiOutlineLoading3Quarters
                  size={25}
                  color="#3c54a1"
                  className="animate-spin"
                />
              )}
            </div>
            <p className="mt-8 pb-2 font-medium">Price</p>
            <Link
              onClick={closeMenu}
              to={getFilterUrl({ price: "all" })}
              className="pt-1 "
            >
              All
            </Link>
            {prices.map((p) => (
              <Link
                key={p.value}
                to={getFilterUrl({ price: p.value })}
                onClick={closeMenu}
                className="pt-1"
              >
                {p.name}
              </Link>
            ))}
            <p className="mt-8 pb-2 font-medium">Rating</p>
            <Link
              onClick={closeMenu}
              to={getFilterUrl({ rating: "all" })}
              className="pt-1 "
            >
              All
            </Link>
            {ratings.map((r) => (
              <Link
                key={r.rating}
                to={getFilterUrl({ rating: r.rating })}
                onClick={closeMenu}
                className="pt-1 "
              >
                {r.name}
              </Link>
            ))}{" "}
          </div>
        )}
      </div>
      <section className="grid  grid-cols-2 h-[80%] gap-3 p-2 pt-10">
        {products[0] !== undefined &&
          products.map((p) => (
            <div
              key={p.image}
              className="flex h-min bg-[#D9D9D9] flex-col items-center justify-items-center p-8 rounded-md "
            >
              <Link to={`/product/${p.slug}`} state={{ productid: p._id }}>
                <img className="object-contain" src={p.image} alt="product" />
              </Link>
              <div className="flex justify-items-center items-center">
                <p className="text-[#7a7a7a] pr-3">${p.price}</p>
                <BsCartPlus
                  onClick={() => addToCartHandler(p)}
                  key={p._id}
                  size={25}
                  cursor="pointer"
                  color="#646464"
                />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ShopScreen;

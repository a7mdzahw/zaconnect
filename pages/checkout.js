import React from "react";
import router from "next/router";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { itemRemoved, itemsTotal } from "../store/cart";
const checkout = () => {
  const { cartItems: items } = useSelector((state) => state.cart);
  const total = useSelector(itemsTotal);

  if (!items.length)
    return (
      <>
        <Head>
          <title>CHECKOUT</title>
        </Head>
        <div className="d-flex flex-column align-items-center">
          <h2 className="display-3 text-center mt-5 pt-4 text-danger">YOUR CART IS EMPTY</h2>
          <button className="btn btn-outline-info text-dark w-50" onClick={() => router.push("/products")}>
            {" "}
            <i className="bi bi-arrow-right"></i> ADD PRODUCTS
          </button>
        </div>
      </>
    );
  return (
    <div>
      <Head>
        <title>CHECKOUT</title>
      </Head>
      {items.map((item) => (
        <Item item={item} key={item.photoURL} />
      ))}
      <h1 className="text-center display-6 text-primary m-5 ">
        TOTAL: <strong className="ms-4">{total}</strong>LE
      </h1>
    </div>
  );
};

const Item = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card m-2">
        <div className="card-body d-flex gap-2">
          <img src={item.photoURL} alt={item.name} style={{ width: 96, height: 96 }} />
          <div className="text-info mx-4">
            <h2>{item.name}</h2>
            <p className="text-muted">
              {item.quantity} x {item.price}LE
            </p>
          </div>
          <button className="btn btn-danger btn-sm ms-auto" onClick={() => dispatch(itemRemoved(item))}>
            REMOVE
          </button>
        </div>
      </div>
    </>
  );
};

export default checkout;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemRemoved, itemsTotal } from "../store/cart";
const checkout = () => {
  const { cartItems: items } = useSelector((state) => state.cart);
  const total = useSelector(itemsTotal);
  return (
    <div>
      {items.map((item) => (
        <Item item={item} key={item.photoURL} />
      ))}
      <h1 className="text-center text-success m-5">Total: ${total} LE</h1>
    </div>
  );
};

const Item = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card m-2">
        <div className="card-body d-flex gap-2">
          <img
            src={item.photoURL}
            alt={item.name}
            style={{ width: 96, height: 96 }}
          />
          <div className="text-info mx-4">
            <h2>{item.name}</h2>
            <p className="text-muted">
              {item.quantity} x ${item.price}LE
            </p>
          </div>
          <button
            className="btn btn-danger btn-sm ms-auto"
            onClick={() => dispatch(itemRemoved(item))}
          >
            REMOVE
          </button>
        </div>
      </div>
    </>
  );
};

export default checkout;

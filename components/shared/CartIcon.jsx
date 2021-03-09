import React from "react";
import Link from "next/link";

const CartIcon = ({ count }) => {
  return (
    <Link href="/checkout">
      <a className="nav-link d-flex  p-0">
        <i className="bi bi-bag bag"></i>
        <p className="item-count"> {count} </p>
      </a>
    </Link>
  );
};

export default CartIcon;

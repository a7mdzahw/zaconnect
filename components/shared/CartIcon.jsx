import React from "react";
import Link from "next/link";

const CartIcon = ({ count }) => {
  return (
    <Link href="/checkout">
      <a className="navbar-brand">
        <div className="d-flex align-items-center justify-content-center">
          <i className="bi bi-bag bag"></i>
          <p className="item-count"> {count} </p>
        </div>
      </a>
    </Link>
  );
};

export default CartIcon;

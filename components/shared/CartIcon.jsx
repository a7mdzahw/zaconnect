import React from "react";
import Link from "next/link";
import { Alert } from "react-bootstrap";

const CartIcon = ({ count }) => {
  return (
    <Link href="/checkout">
      <a className="navbar-brand">
        <div className="d-flex align-items-center justify-content-center">
          <i className="bi bi-bag bag "></i>
          <Alert variant="danger" className="item-count p-0 px-2 text-sm">
            {count}
          </Alert>
        </div>
      </a>
    </Link>
  );
};

export default CartIcon;

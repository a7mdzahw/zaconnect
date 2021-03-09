import React from "react";
import Link from "next/link";
import router from "next/router";

import { useSelector } from "react-redux";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import { signOut } from "../firebase/utils";
import { itemsCount } from "../store/cart";

import CartIcon from "../components/shared/CartIcon";

const NavbarComponent = () => {
  const { current: user, isAuth } = useSelector((state) => state.users);
  const count = useSelector(itemsCount);

  const handletoggle = () => {
    console.log("TTog");
  };
  return (
    <>
      <Navbar expand="md" onToggle={handletoggle}>
        <Container>
          <Link href="/">
            <a className="navbar-brand">
              <i className="bi bi-basket"></i> ZACONNECT
            </a>
          </Link>
          <Nav>
            <Nav.Item>
              <CartIcon count={count} />
            </Nav.Item>
            <Nav.Item>
              <Link href={`/products`}>
                <a className="nav-link">
                  {" "}
                  <i className="bi bi-cash"></i> PRODUCTS
                </a>
              </Link>
            </Nav.Item>

            {isAuth && user ? (
              <>
                <Nav.Item>
                  <Link href={`/users`}>
                    <a className="nav-link">
                      <i className="bi bi-person"></i>
                      USERS
                    </a>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href={`/profile/${user.uid}`}>
                    <a className="nav-link">PROFILE</a>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="danger" className="nav-link" onClick={signOut}>
                    LOGOUT
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link onClick={() => router.push("/login")}>LOGIN</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link onClick={() => router.push("/register")}>SIGN UP</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;

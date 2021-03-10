import React from "react";
import Link from "next/link";
import Head from "next/head";
import router from "next/router";

import { useSelector } from "react-redux";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

import { signOut } from "../firebase/utils";
import { itemsCount } from "../store/cart";

import CartIcon from "../components/shared/CartIcon";

const NavbarComponent = () => {
  const { current: user, isAuth } = useSelector((state) => state.users);
  const count = useSelector(itemsCount);
  const [toggle, setToggle] = React.useState(false);

  return (
    <>
      <Navbar expand="md" expanded={toggle} onToggle={() => setToggle(!toggle)}>
        <Container className="d-flex justify-content-between align-items-between">
          <Link href="/">
            <a className="navbar-brand">
              <i className="bi bi-basket"></i> ZACONNECT
            </a>
          </Link>
          <CartIcon count={count} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-auto d-flex justify-content-center align-items-center"
              onClick={() => setToggle(!toggle)}
            >
              <Nav.Item>
                <Link href={`/products`}>
                  <a className="nav-link">
                    <i className="bi bi-cash"></i> PRODUCTS
                  </a>
                </Link>
              </Nav.Item>

              {isAuth && user ? (
                <>
                  <Nav.Item>
                    <Link href={`/users`}>
                      <a className="nav-link">
                        <i className="bi bi-people"></i>
                        USERS
                      </a>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link href={`/profile/${user.uid}`}>
                      <a className="nav-link">
                        <i className="bi bi-person-square"></i> PROFILE
                      </a>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Button variant="danger" className="nav-link text-light" onClick={signOut}>
                      <i className="bi bi-box-arrow-right"></i>
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link onClick={() => router.push("/login")}>
                      <i className="bi bi-door-open"></i> LOGIN
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link onClick={() => router.push("/register")}>
                      <i className="bi bi-person-plus"></i> SIGN UP
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;

import React from "react";
import Link from "next/link";

import { loginWithGoogle, signOut } from "../firebase/utils";
import { useUser } from "../context/userContext";

import router from "next/router";

const Navbar = () => {
  const { loadingUser, user } = useUser();

  return (
    <nav className="navbar navbar-dark navbar-expand-md bg-dark">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">ZACONNECT</a>
        </Link>
        {loadingUser ? (
          <Spinner />
        ) : (
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link href={`/products`}>
                    <a className="nav-link">PRODUCTS</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/users`}>
                    <a className="nav-link">USERS</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/profile/${user.uid}`}>
                    <a className="nav-link">PROFILE</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm nav-link"
                    onClick={signOut}
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-success btn-sm nav-link"
                    onClick={() => router.push("/login")}
                  >
                    LOGIN
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-success btn-sm mx-5 nav-link"
                    onClick={() => router.push("/register")}
                  >
                    SIGN UP
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-info btn-sm nav-link"
                    onClick={loginWithGoogle}
                  >
                    LOGIN WITH GOOGLE
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

const Spinner = () => {
  return (
    <div className="spinner-border text-light">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Navbar;

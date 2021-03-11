import router from "next/router";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../components/LoginForm";

const login = () => {
  const { isAuth } = useSelector((s) => s.users);
  React.useEffect(() => {
    if (isAuth) router.push("/");
  }, [isAuth]);

  if (isAuth) return null;
  return (
    <div>
      <Head>
        <title>LOGIN</title>
      </Head>
      <LoginForm />
    </div>
  );
};

export default login;

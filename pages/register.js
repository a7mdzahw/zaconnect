import React from "react";
import router from "next/router";
import Head from "next/head";
import { useSelector } from "react-redux";

import RegisterForm from "../components/RegisterForm";

const register = () => {
  const { isAuth, current } = useSelector((s) => s.users);
  React.useEffect(() => {
    if (isAuth) router.push("/");
  }, [isAuth]);
  if (isAuth) return null;
  return (
    <div>
      <Head>
        <title>REGISTER</title>
      </Head>
      <RegisterForm />
    </div>
  );
};

export default register;

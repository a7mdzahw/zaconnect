import router from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import LoginForm from "../components/LoginForm";

const login = () => {
  const { isAuth } = useSelector((s) => s.users);
  React.useEffect(() => {
    if (isAuth) router.push("/");
  }, [isAuth]);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default login;

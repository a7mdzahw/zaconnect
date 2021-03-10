import React from "react";
import router from "next/router";
import { useSelector } from "react-redux";

import RegisterForm from "../components/RegisterForm";

const register = () => {
  const { isAuth } = useSelector((s) => s.users);
  React.useEffect(() => {
    if (isAuth) router.push("/");
  }, [isAuth]);
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default register;

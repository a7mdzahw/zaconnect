import router from "next/router";
import React from "react";

import LoginForm from "../components/LoginForm";

const login = () => {
  React.useEffect(() => {
    if (false) router.push("/");
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default login;

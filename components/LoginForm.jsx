import React from "react";
import { auth } from "../firebase";
import { loginWithGoogle } from "../firebase/utils";

import Input from "./shared/Input";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [data, setData] = React.useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(data.email, data.password);
    } catch (ex) {
      alert(ex.message);
    }

    setData(INITIAL_STATE);
  };

  return (
    <div className="container card">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="d-flex align-items-center gap-2 mt-3 flex-column">
          <div className="w-75">
            <Input id="email" type="email" onChange={handleChange} label="Email" value={data.email} />
            <Input id="password" type="password" onChange={handleChange} label="Password" value={data.password} />
          </div>
          <button className="btn-primary btn-sm btn btn-block w-75">
            {" "}
            <i className="bi bi-person"></i> LOGIN
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center">
        <button className="nav-link btn m-2 text-success" onClick={loginWithGoogle}>
          <i className="bi bi-google display-6"></i>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

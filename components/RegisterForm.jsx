import React from "react";
import { auth } from "../firebase";

import Input from "./shared/Input";

const INITIAL_STATE = {
  name: "",
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
      const { user } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      await user.updateProfile({
        displayName: data.name,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/za-shop.appspot.com/o/unknown.jpg?alt=media&token=ddc08cb5-c24a-4601-a473-afdd533615a0",
      });
    } catch (ex) {
      alert(ex.message);
    }

    setData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center gap-2 mt-3 flex-column">
        <div className="w-75">
          <Input
            id="name"
            type="name"
            onChange={handleChange}
            label="Name"
            value={data.name}
          />
          <Input
            id="email"
            type="email"
            onChange={handleChange}
            label="Email"
            value={data.email}
          />
          <Input
            id="password"
            type="password"
            onChange={handleChange}
            label="Password"
            value={data.password}
          />
        </div>
        <button className="btn-primary btn-sm btn btn-block w-75">LOGIN</button>
      </div>
    </form>
  );
};

export default LoginForm;

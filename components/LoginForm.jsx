import React from "react";
import router from "next/router";
import { Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { loginWithGoogle } from "../firebase/utils";

import Input from "./shared/Input";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [data, setData] = React.useState(INITIAL_STATE);
  const [showLoginSpinner, setShowLoginSpinner] = React.useState(false);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoginSpinner(true);
    try {
      const { user } = await auth.signInWithEmailAndPassword(data.email, data.password);
      toast.success(`Welcome, ${user.displayName}`);
    } catch (ex) {
      toast.error(ex.message);
    } finally {
      setShowLoginSpinner(false);
    }
  };

  return (
    <div className="container card">
      <form onSubmit={handleSubmit} className="card-body">
        <i className="bi bi-person display-4 p-0 text-center d-grid"></i>
        <div className="d-flex align-items-center gap-2 mt-3 flex-column">
          <div className="w-75">
            <Input id="email" type="email" onChange={handleChange} label="Email" value={data.email} />
            <Input id="password" type="password" onChange={handleChange} label="Password" value={data.password} />
          </div>
          <button className="btn-primary btn-sm btn btn-block w-75">
            <i className="bi bi-person"></i> LOGIN
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center">
        <button className="nav-link btn m-2 btn-outline-success  text-success" onClick={loginWithGoogle}>
          <i className="bi bi-google display-6"></i>
        </button>
      </div>

      <p className="text-dark mt-2 text-center">
        new user sign up{" "}
        <Link href="/register">
          <a className="text-sucess">here</a>
        </Link>
      </p>

      <Modal show={showLoginSpinner} centered>
        <Modal.Body className="d-flex align-items-center flex-column p-3">
          <h2 className="display-6 mx-3">Please Wait</h2>
          <Spinner animation="border" variant="success" className="m-2" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;

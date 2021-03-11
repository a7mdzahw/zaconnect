import React from "react";
import Link from "next/link";
import { Modal, Spinner, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { image } from "../firebase/users";
import { upload } from "../firebase/utils";

import Input from "./shared/Input";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const unknown =
    "https://firebasestorage.googleapis.com/v0/b/za-shop.appspot.com/o/unknown.jpg?alt=media&token=ddc08cb5-c24a-4601-a473-afdd533615a0";

  const [data, setData] = React.useState(INITIAL_STATE);
  const [file, setFile] = React.useState({});
  const [progress, setProgress] = React.useState({});
  const [showCreateSpinner, setShowCreateSpinner] = React.useState(false);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };
  const addFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowCreateSpinner(true);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async ({ user }) => {
        try {
          const task = image(file);
          await upload(
            task,
            (per) => setProgress(per),
            (err) => toast.error(err.message),
            async (url) => {
              await user.updateProfile({
                displayName: data.name,
                photoURL: url || unknown,
              });
              db.doc(`users/${user.uid}`).update({
                displayName: data.name,
                photoURL: url,
              });
              toast.success(`Welcome, ${user.displayName}`);
            }
          );
        } catch {
          await user.updateProfile({
            displayName: data.name,
            photoURL: unknown,
          });
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setShowCreateSpinner(false));
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="d-flex align-items-center gap-2 mt-3 flex-column">
          <i className="bi bi-person-plus display-5 p-0"></i>
          <div className="w-75">
            <Input id="name" type="name" onChange={handleChange} label="Name" value={data.name} />
            <Input id="email" type="email" onChange={handleChange} label="Email" value={data.email} />
            <Input id="password" type="password" onChange={handleChange} label="Password" value={data.password} />
            <Input id="file" type="file" onChange={addFile} label="Profile PIC" />
          </div>
          <button className="btn-primary btn-sm btn btn-block w-75">SIGN UP</button>
        </div>
        <p className="text-dark mt-2 text-center">
          aLready a user sign in{" "}
          <Link href="/login">
            <a className="text-sucess">here</a>
          </Link>
        </p>

        <Modal show={showCreateSpinner} centered>
          <Modal.Body className="d-flex align-items-center flex-column p-3">
            <h2 className="display-6 mx-3">Creating Account</h2>
            <Spinner animation="border" variant="success" className="m-2" />
          </Modal.Body>
        </Modal>
      </form>
    </div>
  );
};

export default RegisterForm;

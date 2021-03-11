import { useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import firebase, { auth } from "../../firebase";
import { remove } from "../../firebase/users";

import Input from "../../components/shared/Input";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Profile() {
  const { current: user, isAuth } = useSelector((state) => state.users);
  const [data, setData] = useState(INITIAL_STATE);
  const [show, setShow] = useState(false);
  const [showDeleteSPinner, setShowDeleteSpinner] = useState(false);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  useEffect(() => {
    if (!isAuth) router.push("/");
  }, [isAuth]);

  const deleteAccount = async (e) => {
    e.preventDefault();
    setShowDeleteSpinner(true);
    const user = auth.currentUser;
    const credential = new firebase.auth.EmailAuthProvider.credential(data.email, data.password);
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        const uid = user.uid;
        remove(uid)
          .then(async () => {
            try {
              await user.delete();
              toast.warning("ACCOUNT DELETED");
            } catch (ex) {
              toast.error(ex.message);
            }
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setShowDeleteSpinner(false));
  };

  return (
    <div className="container">
      <Head>
        <title>PROFILE PAGE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="d-flex flex-column align-items-center">
        <h1 className="title display-3">WELCOME BACK</h1>
        <div className="d-flex justify-content-center gap-5">
          <div>
            <h2 className="display-6">{user && user.displayName}</h2>
            <p className="text-muted">{user && user.email}</p>
          </div>
          <img src={user && user.photoURL} alt="item" className="img-fluid w-75" />
        </div>

        <button className="btn btn-danger mt-4" onClick={() => setShow(true)}>
          <i className="bi bi-trash"></i> DELETE ACCOUNT
        </button>

        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header>DANGEROUS OPERATION</Modal.Header>
          <Modal.Title className="mx-3">Please log in again</Modal.Title>
          <Modal.Body>
            <form onSubmit={deleteAccount}>
              <Input id="email" label="Email" value={data.email} onChange={handleChange} />
              <Input id="password" label="Password" value={data.password} onChange={handleChange} type="password" />
              <div className="d-flex justify-content-between">
                <Button type="submit" className="my-2" variant="danger">
                  Delete
                </Button>
                <Button onClick={() => setShow(false)} className="my-2" variant="info">
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={showDeleteSPinner}>
          <Modal.Body className="d-flex gap-3">
            <Spinner animation="border" variant="danger" />
            <p className="display-6">Deleting Account</p>
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
}

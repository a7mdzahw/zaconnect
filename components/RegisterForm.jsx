import React from "react";
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

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };
  const addFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(data.email, data.password);

      try {
        const task = image(file);
        await upload(
          task,
          (per) => console.log(per),
          (err) => console.log(err),
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
    } catch (ex) {
      alert(ex.message);
    }

    setData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center gap-2 mt-3 flex-column">
        <div className="w-75">
          <Input id="name" type="name" onChange={handleChange} label="Name" value={data.name} />
          <Input id="email" type="email" onChange={handleChange} label="Email" value={data.email} />
          <Input id="password" type="password" onChange={handleChange} label="Password" value={data.password} />
          <Input id="file" type="file" onChange={addFile} label="Profile PIC" />
        </div>
        <button className="btn-primary btn-sm btn btn-block w-75">SIGN UP</button>
      </div>
    </form>
  );
};

export default RegisterForm;

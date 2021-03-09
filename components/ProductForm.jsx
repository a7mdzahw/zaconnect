import React from "react";
import joi from "joi";

import { Alert } from "react-bootstrap";

import * as products from "../firebase/products";
import Input from "./shared/Input";

const INITIAL_STATE = {
  name: "",
  category: "",
  photoURL: "img.jpg",
  price: "",
};

const ProductForm = () => {
  const [data, setData] = React.useState(INITIAL_STATE);
  const [file, setFile] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const addFile = ({ target }) => {
    setFile(target.files[0]);
  };

  const validate = (product) => {
    const schema = joi.object({
      name: joi.string().required().max(255).min(3),
      category: joi.string().required().max(255).min(3),
      photoURL: joi.string().max(255),
      price: joi.number().required(),
    });
    return schema.validate(product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validate(data);
    if (error) {
      return setErrors([error.details[0].message, ...errors]);
    }

    setLoading(true);
    try {
      try {
        const task = products.image(file);
        await task.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              setData({ ...data, photoURL: downloadURL });
            });
          }
        );
      } catch (ex) {
        alert("ERROR UPLOAD ", ex.message);
      }
      await products.create({ ...data });
    } catch (ex) {
      alert(ex.message);
    }

    setData(INITIAL_STATE);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body">
        {errors.length ? <Alert variant="danger">{errors[0]}</Alert> : null}
        <div className="d-flex align-items-center gap-2 mt-3 flex-column">
          <div className="w-75">
            <Input id="name" type="text" onChange={handleChange} label="Name" value={data.name} />
            <Input id="category" type="text" onChange={handleChange} label="Category" value={data.category} />
            <Input id="price" type="text" onChange={handleChange} label="Price" value={data.price} />

            <Input id="Image" type="file" onChange={addFile} label="Upload Image" />
          </div>
          {progress != 0 && <progress value={progress} max="100" className="w-75 progress-bar" />}
          <button className="btn-primary btn-sm btn btn-block w-75">
            SUBMIT PRODUCT{" "}
            {loading && (
              <div className="spinner-border text-sm">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

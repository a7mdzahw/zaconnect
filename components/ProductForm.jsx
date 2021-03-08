import React from "react";
import joi from "joi";
import * as products from "../firebase/products";

import Input from "./shared/Input";

const INITIAL_STATE = {
  name: "",
  category: "",
  photoURL: "image.jpg",
  price: "",
};

const ProductForm = () => {
  const [data, setData] = React.useState(INITIAL_STATE);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
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

  const addFile = ({ target }) => {
    setFile((old) => target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validate(data);
    if (error) {
      return setErrors([error.details[0].message, ...errors]);
    }

    setLoading(true);
    try {
      let path;
      try {
        path = await products.image(file);
      } catch (ex) {
        alert("ERROR UPLOAD ", ex.message);
      }
      await products.create({ ...data, photoURL: path });
      alert("Product ADDED");
    } catch (ex) {
      alert(ex.message);
    }

    setData(INITIAL_STATE);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors && errors[0]}
      <div className="d-flex align-items-center gap-2 mt-3 flex-column">
        <div className="w-75">
          <Input
            id="name"
            type="text"
            onChange={handleChange}
            label="Name"
            value={data.name}
          />
          <Input
            id="category"
            type="text"
            onChange={handleChange}
            label="Category"
            value={data.category}
          />
          <Input
            id="price"
            type="text"
            onChange={handleChange}
            label="Price"
            value={data.price}
          />

          <Input
            id="Image"
            type="file"
            onChange={addFile}
            label="Upload Image"
          />
        </div>
        <button className="btn-primary btn-sm btn btn-block w-75">
          SUBMIT PRODUCT{" "}
          {loading && (
            <div className="spinner-border text-sm">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

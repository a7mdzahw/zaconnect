import React from "react";
import joi from "joi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Alert, ProgressBar, Modal } from "react-bootstrap";

import * as products from "../firebase/products";
import { upload } from "../firebase/utils";
import { addProduct } from "../store/products";
import Input from "./shared/Input";

const INITIAL_STATE = {
  name: "",
  category: "",
  photoURL: "img.jpg",
  price: "",
};

const ProductForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(INITIAL_STATE);
  const [file, setFile] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
  const [show, setShow] = React.useState(false);
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
    setShow(true);
    setErrors([]);
    const { error } = validate(data);
    if (error) {
      setShow(false);
      return setErrors([error.details[0].message, ...errors]);
    }
    try {
      const task = products.image(file);
      await upload(
        task,
        (percen) => setProgress(percen),
        (err) => toast.error(err.message),
        (url) => {
          products
            .create({ ...data, photoURL: url })
            .then(() => {
              toast.success("PRODUCT ADDED");

              dispatch(addProduct({ ...data, photoURL: url }));
            })
            .catch((err) => {
              console.log("here2");
              toast.error(err.message);
            })
            .finally(() => setShow(false));
        }
      );
    } catch (ex) {
      setShow(false);
      toast.error(ex.message);
      toast.error("PLEASE ADD PIC FILE !!");
    }
  };

  return (
    <>
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
            <button className="btn-primary btn-sm btn btn-block w-75">SUBMIT PRODUCT</button>
          </div>
        </div>
      </form>
      <Modal show={show} centered className="z-index-5">
        <Modal.Body className="d-flex align-items-center flex-column p-3">
          <h2 className="display-6 mx-3">Please Wait</h2>
          <ProgressBar animated now={progress} className="w-75" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductForm;

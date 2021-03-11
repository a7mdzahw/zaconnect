import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "../components/ProductForm";
import { Modal, Spinner } from "react-bootstrap";

import * as productService from "../firebase/products";
import { itemAdded } from "../store/cart";
import { productRemoved, productsRecieved } from "../store/products";
import { toast } from "react-toastify";

const products = () => {
  const [show, setShow] = React.useState(false);

  let unsubscribe;
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);
  const { isAuth } = useSelector((s) => s.users);

  const get_products = async () => {
    const products = await productService.get_all();
    dispatch(productsRecieved(products));
  };

  React.useEffect(() => {
    get_products();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const toggleModel = () => setShow((show) => !show);
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <Spinner animation="grow" variant="success" />
      </div>
    );
  return (
    <>
      {isAuth && (
        <button className="btn btn-sm btn-info m-4" onClick={toggleModel}>
          <i className="bi bi-bag"></i> ADD NEW PRODUCT
        </button>
      )}
      <div className="d-flex flex-wrap gap-2 justify-content-center">
        <Modal show={show} onHide={toggleModel} centered>
          <Modal.Header className="display-5 text-center">ADD NEW PRODUCT</Modal.Header>
          <Modal.Body>
            <ProductForm />
          </Modal.Body>
        </Modal>

        {list.map((p) => (
          <Product key={p.photoURL} product={p} />
        ))}
      </div>
    </>
  );
};

const Product = ({ product }) => {
  const { list } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleProductRemove = async (product) => {
    const old = [...list];
    try {
      dispatch(productRemoved(product));
      await productService.remove(product);
    } catch (ex) {
      dispatch(productsRecieved(old));
      alert(ex.message);
    }
  };
  return (
    <div className="card">
      <div className="card-img-top">
        <img src={product.photoURL} alt={product.name} className="img-fluid" />
      </div>
      <div className="card-body d-flex flex-wrap justify-content-between gap2">
        <div>
          <h2 className="display-6">{product.name.toUpperCase()}</h2>
          <p className="text-success">${product.price} LE</p>
        </div>
        <button className="btn btn-sm btn-danger h-50" onClick={() => handleProductRemove(product)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-sm text-dark w-100 btn-outline-info"
          onClick={() => {
            dispatch(itemAdded(product));
            toast.info(`${product.name} Added to Cart`);
          }}
        >
          + ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default products;

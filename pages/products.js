import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "../components/ProductForm";
import { Modal } from "react-bootstrap";

import * as productService from "../firebase/products";
import { itemAdded } from "../store/cart";
import { productRemoved, productsRecieved } from "../store/products";
import { toast } from "react-toastify";

const products = ({ products }) => {
  const [show, setShow] = React.useState(false);

  let unsubscribe;
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);
  const { isAuth } = useSelector((s) => s.users);

  React.useEffect(() => {
    dispatch(productsRecieved(products));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const toggleModel = () => setShow((show) => !show);

  return (
    <>
      {loading && (
        <div className="spinner-border text-success">
          <span className="visually-hidden">Loading</span>
        </div>
      )}

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
      <div className="card-body">
        <h2 className="display-6">{product.name.toUpperCase()}</h2>
        <p className="text-success">${product.price} LE</p>
        <button className="btn btn-sm btn-danger" onClick={() => handleProductRemove(product)}>
          REMOVE
        </button>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-sm btn-info w-100"
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

export const getServerSideProps = async (ctx) => {
  const products = await productService.get_all();
  return { props: { products } };
};

export default products;

import React from "react";
import * as productService from "../firebase/products";

const products = ({ products }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      {products.map((p) => (
        <Product key={p.photoURL} product={p} />
      ))}
    </div>
  );
};

const Product = ({ product }) => (
  <div className="card">
    <div className="card-img-top">
      <img src={product.photoURL} alt={product.name} className="img-fluid" />
    </div>
    <div className="card-body">
      <h2 className="display-6">{product.name.toUpperCase()}</h2>
      <p className="text-success">${product.price} LE</p>
    </div>
    <div className="card-footer">
      <button className="btn btn-sm btn-info w-100">+ ADD TO CART</button>
    </div>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const products = await productService.get_all();
  return { props: { products } };
};

export default products;

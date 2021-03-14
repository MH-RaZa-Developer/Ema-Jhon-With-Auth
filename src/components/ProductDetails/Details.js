import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const Details = () => {
  const { productKey } = useParams();
  const product = fakeData.find((data) => data.key === productKey);
  console.log(product);

  return (
    <div>
      <h1>Product Details</h1>
      <Product showButton={false} product={product}></Product>
    </div>
  );
};

export default Details;

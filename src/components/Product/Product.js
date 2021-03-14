import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const products = props.product;
  const handleAddProduct = props.handleAddProduct;
  // console.log(products)
  const { name, img, price, seller, stock, key} = props.product;
  return (
    <div className="productHolder">
      <div className="productImgHolder">
        <img className="productimg" src={img} alt="" />
      </div>

      <div className="productDetails">
        <h4 className="pdName"><Link to={"/product/"+key}>{name}</Link></h4>
        <p>Price : ${price}</p>
        <p>
          <small>by: {seller}</small>
        </p>
        <p>
          <small> only {stock} items Left in Our Stock --Order Soon</small>{" "}
        </p>
{  props.showButton && <button onClick={()=>handleAddProduct(products)} className="pdBtn">Add To Cart</button>
}      </div>
    </div>
  );
};

export default Product;

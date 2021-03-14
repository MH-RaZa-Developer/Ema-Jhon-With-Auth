import React, { useEffect } from "react";
import { useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from 'react-router-dom';

import {   addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
const Shop = () => {
  // console.log(fakeData)
  const first10 = fakeData.slice(0, 10);
  // console.log(first10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(existingKeys => {
      const product = fakeData.find(pd => pd.key === existingKeys);
      product.quantity = savedCart[existingKeys];
  
      return product;
    })
    setCart(previousCart);

  },[])
  
  const handleAddProduct =(product) => {
    const tobeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === product.key);
    let count = 1;
    let newCart;
    if(sameProduct) {
      count = sameProduct.quantity +1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== tobeAddedKey);
      newCart = [...others, sameProduct]
    }
    else{
       product.quantity = 1;
       newCart = [...cart, product]
    }
    // console.log("Clicked",product)
    setCart(newCart);
    addToDatabaseCart(product.key,count)
  }
  // console.log("from state products",products )

  return (
    <div className="shopContainer">
      <div className="productContainer">
        <ul>
          {products.map((product) => (
            <Product handleAddProduct={handleAddProduct} product={product} key={product.img} showButton={true} ></Product>
          ))}
        </ul>
      </div>
      <div className="cartContainer">
      <Cart cart={cart}>
      <Link to="/review" > <button className="pdBtn" >Review Your Order</button></Link>

      </Cart>
      </div>
    </div>
  );
};

export default Shop;

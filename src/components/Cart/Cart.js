import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const totalPrice = cart.reduce((total, prd)=> total+prd.price, 0);
    let totalPrice  = 0;
    for (let i = 0; i < cart.length; i++) {
      const product  = cart[i];
      totalPrice = totalPrice + product.price * product.quantity;
    }

    let shipping = 0;
    if (totalPrice > 0) {
        shipping = 12.99
    }

    else if (totalPrice > 10) {
        shipping = 4.99
    }
    if (totalPrice > 50) {
        shipping = 0
    };
    const tax = totalPrice / 10;
    const formatNumber = num => {
        const format = num.toFixed(2);
        return Number(format);
    }
        return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formatNumber(totalPrice)}</p>
            <p>Total Price : $ {formatNumber(totalPrice + shipping + tax)} </p>
            <p>Shipping Cost : $ {formatNumber(shipping)} </p>
            <p> Tax + Vat : $ {formatNumber(tax)}</p>
            { 
             props.children
             }
        </div>
    );
};

export default Cart;
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import thankYou from '../../images/giphy.gif'
import { useHistory } from 'react-router';


const Review = () => {
    const [cart, setCart] = useState([]);
    const RemoveProduct = (productKey) => {
        console.log("Remove Clicked",  productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart)
        // console.log(productKeys)
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts)
        setCart(cartProducts);
    },[]);
    const [orderPlace, setOrderPlace] = useState(false)
    const history = useHistory();
const handleProceedCheckout = ()=> {

    history.push('/shipment');

};
let orderPlacedSuccessfully;
if(orderPlace){
    orderPlacedSuccessfully = <img src={thankYou} alt=""/>
}

    return (
        
        <div className="shopContainer">
                       { orderPlacedSuccessfully }

           <div className="productContainer">
           {
            cart.map(pd => <ReviewItem 
                RemoveProduct={RemoveProduct}
                product={pd}
                key={pd.key}></ReviewItem>)
            }        
           </div>
           <div className="cartContainer">
            <Cart  cart={cart} >
            <button onClick = {handleProceedCheckout} className="pdBtn" >Proceed Checkout</button>

            </Cart>
           </div>
           </div>
    );
};

export default Review;
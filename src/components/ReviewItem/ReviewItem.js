import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key} = props.product;
    const RemoveProduct = props.RemoveProduct;
    const rStyle = {
        borderBottom : "1px solid lightgray",
        marginBottom : "10px",
        paddingBottom : "10px",
        marginLeft : "100px"
    }
    return (
        <div style={rStyle}>
            <h4 className="pdName"> {name} </h4>
            <p>Quantity: {quantity} </p>
            <br/>
            <button onClick={()=>RemoveProduct(key)} className="pdBtn">Remove Item</button>
        </div>
    );
};

export default ReviewItem;
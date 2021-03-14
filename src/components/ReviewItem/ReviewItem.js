import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemoveFormat } from '@fortawesome/free-solid-svg-icons'

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
            <button onClick={()=>RemoveProduct(key)} className="pdBtn">Remove Item <FontAwesomeIcon icon={faRemoveFormat} /></button>
        </div>
    );
};

export default ReviewItem;
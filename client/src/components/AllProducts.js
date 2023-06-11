import React, { useState } from 'react';
import '../App.css'

function AllProducts({ product }) {
    const productName = product.name.slice(0,1).toUpperCase() + product.name.slice(1, product.name.length)
    const [viewOrderForm, setViewOrderForm] = useState(false)
    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    return (
        <div>
            <div className="productcontainer">
                <img className="productimg" src={product.img} alt={product.name} width="30%" height="30%"/>
                <br/>
                <p className="productform">Custom Handstamped {productName}
                <br/>
                {viewOrderForm == false ? <button onClick={onViewClick}>Add to Order</button> : null}</p>
            </div>
        </div>
    )
}

export default AllProducts;
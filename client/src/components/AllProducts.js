import React from 'react';
import '../App.css'

function AllProducts({ product }) {
    const productName = product.name.slice(0,1).toUpperCase() + product.name.slice(1, product.name.length)

    return (
        <div className="productcontainer">
            <img className="productimg" src={product.img} alt={product.name} width="30%" height="30%"/>
            <br/>
            <p className="productform">Custom Handstamped {productName}</p>
        </div>
    )
}

export default AllProducts;
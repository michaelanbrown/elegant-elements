import React from 'react';
import '../App.css'

function ProductsList({ product, customizations }) {
    const productType = product.jewelry.slice(0,1).toUpperCase() + product.jewelry.slice(1,product.jewelry.length)
    console.log(customizations)

    return (
        <div>
            {productType}
        </div>
    )
}

export default ProductsList;
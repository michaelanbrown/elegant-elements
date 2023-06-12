import React from 'react';
import '../App.css'

function ProductCartCard({ product }) {
    const products = [{
        name: "necklace",
        img: "https://cdn.shopify.com/s/files/1/0008/8932/3571/products/DSC_0019_800x800_1200x1200.jpg?v=1541563917"
    },
    {
        name: "bracelet",
        img: "https://i.etsystatic.com/36356145/c/2250/3000/0/0/il/dae616/4014621765/il_680x540.4014621765_6hiw.jpg"
    },
    {
        name: "keychain",
        img: "https://cdn.shopify.com/s/files/1/0286/6042/products/il_fullxfull.993577520_n2ym_1024x1024.jpg?v=1466991492"
    }]

    const productImg = products.filter(prod => {
        if (prod.name.slice(0,1).toUpperCase() + (prod.name.slice(1, prod.length)) == product.jewelry) {
            return prod
        }
    })
    

    return (
        <div className="productCard">
            { product.jewelry }
            <img className="productimg" src={ productImg[0].img } alt={product.name} width="30%" height="30%"/>
            <br/>
            <br/>
        </div>
    )
}

export default ProductCartCard;
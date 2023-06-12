import React, { useState } from 'react';
import '../App.css'

function ProductCartCard({ product, customizations, setCustomizations, orderTotalAddition, setOrderTotalAddition }) {
    const availableProducts = [{
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

    const productImg = availableProducts.filter(prod => {
        if (prod.name.slice(0,1).toUpperCase() + (prod.name.slice(1, prod.length)) == product.jewelry) {
            return prod
        }
    })
    const [errors, setErrors] = useState([])

    const currentCustomization = customizations.filter(custom => {
        if(custom.id == product.customization_id) {
            return custom
        } else {
            return null
        }
    })

    const [productUpdate, setProductUpdate] = useState({
        quantity: product.quantity
    });
    const {quantity} = productUpdate

    function onQuantityUpdate(e) {
        e.preventDefault();
        fetch(`${product.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(productUpdate)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(product => {
                })
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function downClick() {
        if (quantity > 1) {
            setProductUpdate({
                quantity: quantity - 1
            })
            setOrderTotalAddition(orderTotalAddition - ((product.price + currentCustomization[0].price)/product.quantity))
        }
    }

    function upClick() {
            setProductUpdate({
                quantity: quantity + 1
            })
            setOrderTotalAddition(orderTotalAddition + ((product.price + currentCustomization[0].price)/product.quantity))
    }


    return (
        <div className="productCard">
            <img className="productimg" src={ productImg[0].img } alt={product.name} width="44%" height="44%"/>
            <br/>
            Custom Handstamped { product.jewelry }
            <p>{product.jewelry}: ${product.price}</p>
            <p>Customization Type: {currentCustomization[0].custom_type} - ${currentCustomization[0].price} </p>
            <div>Custom Stamp: {currentCustomization[0].personalization}</div>
            <p>Quantity: <input type="button" value="-" onClick={downClick} />
                {" "}{quantity}{" "}
            <input type="button" value="+" onClick={upClick}/></p>
            <p>Item Total: ${((product.price + currentCustomization[0].price)/product.quantity)*quantity}</p>
            <br/>
        </div>
    )
}

export default ProductCartCard;
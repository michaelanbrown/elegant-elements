import React, { useState } from 'react';
import '../App.css'

function ProductCartCard({ product, customizations, orderTotalAddition, setOrderTotalAddition, orders, setOrders }) {
    const [keepChanges, setKeepChanges] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(product)
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
        if (prod.name.slice(0,1).toUpperCase() + (prod.name.slice(1, prod.length)) == currentProduct.jewelry) {
            return prod
        }
    })
    const [errors, setErrors] = useState([])

    const currentCustomization = customizations.filter(custom => {
        if(custom.id == currentProduct.customization_id) {
            return custom
        } else {
            return null
        }
    })

    const [productUpdate, setProductUpdate] = useState({
        quantity: currentProduct.quantity
    });
    const {quantity} = productUpdate

    function quantityUpdate() {
        fetch(`products/${currentProduct.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(productUpdate)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(setKeepChanges(false))
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function deleteProduct() {
        fetch(`products/${currentProduct.id}`, {
            method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setOrderTotalAddition(orderTotalAddition - (currentProduct.price + (currentCustomization[0].price * currentProduct.quantity)))
            setCurrentProduct({
                ...currentProduct,
                quantity: 0
            })
          }
        })
    }

    function downClick() {
        if (quantity > 1) {
            setProductUpdate({
                quantity: quantity - 1
            })
            setOrderTotalAddition(orderTotalAddition - ((currentProduct.price/currentProduct.quantity) + currentCustomization[0].price))
            setKeepChanges(true)
        }
    }

    function upClick() {
            setProductUpdate({
                quantity: quantity + 1
            })
            setOrderTotalAddition(orderTotalAddition + ((currentProduct.price/currentProduct.quantity) + currentCustomization[0].price))
            setKeepChanges(true)
    }


    return (
        <>
        {currentProduct.quantity > 0 ?
            <div className="productCard">
                <img className="productimg" src={ productImg[0].img } alt={currentProduct.name} width="44%" height="44%"/>
                <br/>
                Custom Handstamped { currentProduct.jewelry }
                <p>{currentProduct.jewelry}: ${currentProduct.price/currentProduct.quantity}</p>
                <p>Customization Type: {currentCustomization[0].custom_type} - ${currentCustomization[0].price} </p>
                <div>Custom Stamp: {currentCustomization[0].personalization}</div>
                <p>Quantity: <input type="button" value="-" onClick={downClick} />
                    {" "}{quantity}{" "}
                <input type="button" value="+" onClick={upClick}/></p>
                <p>Item Total: ${((currentProduct.price + (currentCustomization[0].price * currentProduct.quantity))/currentProduct.quantity)*quantity}</p>
                { keepChanges ? <button onClick={quantityUpdate}>Keep Changes?</button> : null}
                <br/>
                <button onClick={deleteProduct}>Remove Item</button>
                <br/>
                <br/>
            </div> : null
        }</>
    )
}

export default ProductCartCard;
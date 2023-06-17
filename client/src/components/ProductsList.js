import React, { useEffect, useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function ProductsList({ order, setOrder, orderProducts, productPrice, product, customizations, orders, setOrders, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const [custCustomization, setCustCustomization] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        total: 0,
        discount: 0
    })
    const {total, discount} = formData
    const [reOrderProduct, setReOrderProduct] = useState({
        jewelry: product.jewelry.toLowerCase(),
        customization_id: product.customization_id,
        quantity: 1
    })
    const {jewelry, customization_id, quantity} = reOrderProduct
    
    useEffect(() => {
        (customizations.map(cust => {
            if (cust.id == product.customization_id) {
                setCustCustomization(cust)
                return cust
            }
        }))
    }, [customizations, order])


    const customType = custCustomization.custom_type ? custCustomization.custom_type : null
    const customizationLine = custCustomization ? <p>Customization: {customType} - "{ custCustomization.personalization }" </p> : null

    function onClick() {
        const newOrder = {
            total,
            discount
        }
        fetch("/orders",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(newOrder)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(newOrder => {
                      setOrders([...orders, newOrder])   
                  })
                } else {
                    res.json().then(json => setErrors([json.errors]))
                }
          })
          const product = {
            jewelry,
            customization_id,
            quantity,
            price: productPrice * quantity
        }
          fetch("/products",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(product)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(product => {
                  setProductCount(productCount + 1)
                  setOrder({order,
                    products: [...order.products, product],
                    total: order.total + ((product.price + product.customization.price) * quantity)})
                    })
                navigate(`/cart`)
              } else {
                  res.json().then(json => setErrors([...errors, json.errors]))
              }
          })
    }
    console.log(order)

    return (
            <div className='customization'>
                <br className='break'/>
                Jewelry: {product.jewelry}
                { customizationLine }
                <button onClick={onClick}>Order Again</button>
                <br/>
                <br/>
            </div>
    )
}

export default ProductsList;
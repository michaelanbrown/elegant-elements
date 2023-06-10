import React, { useEffect, useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function ProductsList({ product, customizations, orders, setOrders }) {
    const navigate = useNavigate();
    const [custCustomization, setCustCustomization] = useState(false)
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        total: 0,
        discount: 0
    })
    const {total, discount} = formData
    const [reOrderProduct, setReOrderProduct] = useState({
        jewelry: product.jewelry.toLowerCase(),
        customization_id: product.customization_id,
        quantity: 1,
        order_id: ""
    })
    const {jewelry, customization_id, quantity, order_id} = reOrderProduct
    
    useEffect(() => {
        (customizations.map(cust => {
            if (cust.id == product.customization_id) {
                setCustCustomization(cust)
                return cust
            }
        }))
    }, [customizations])

    const customType = custCustomization.custom_type ? custCustomization.custom_type : null
    const customizationLine = custCustomization ? <p>Customization: {customType} - "{ custCustomization.personalization }" </p> : null

    function onClick() {
        const order = {
            total,
            discount
        }
        fetch("/orders",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(order)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(order => {
                      setOrders([...orders, order])
                    const product = {
                        jewelry,
                        customization_id,
                        quantity,
                        order_id: order.id
                    }
                      fetch("/products",{
                        method:'POST',
                        headers:{'Content-Type': 'application/json'},
                        body:JSON.stringify(product)
                      })
                      .then(res => {
                          if(res.ok){
                              res.json().then(navigate(`/`)
                              )
                          } else {
                              res.json().then(json => setErrors([json.errors]))
                          }
                      }) 
                  })
              } else {
                  res.json().then(json => setErrors([json.errors]))
              }
          })
    }

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
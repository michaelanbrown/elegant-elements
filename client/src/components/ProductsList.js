import React, { useEffect, useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function ProductsList({ product, customizations, orders, setOrders }) {
    const [custCustomization, setCustCustomization] = useState(false)
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        total: 0,
        discount: 0
    })
    const {total, discount} = formData
    
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
import React, { useState, useContext, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import { useNavigate } from 'react-router-dom';

function AllProducts({ product, productPrice, customizations, setCustomizations, orders, setOrders, order, setOrder, productCount, setProductCount }) {
    const options = ["", "phrase", "word", "date"]
    const navigate = useNavigate();
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const productName = product.name.slice(0,1).toUpperCase() + product.name.slice(1, product.name.length)
    const [viewOrderForm, setViewOrderForm] = useState(false)
    const [errors, setErrors] = useState([])
    const typeOptions = options.map(option => {
        return (<option value={option} key={option}>{option.slice(0,1).toUpperCase() + option.slice(1, option.length)}</option>)
    })
    const [customForm, setCustomForm] = useState({
        custom_type: "",
        personalization: ""
    })
    const {custom_type, personalization} = customForm
    const [orderProduct, setOrderProduct] = useState({
        jewelry: product.name,
        customization_id: "",
        quantity: 1
    })
    const {jewelry, quantity} = orderProduct
    const [orderData, setOrderData] = useState({
        total: 0,
        discount: 0
    })
    const {total, discount} = orderData

    useEffect(() => {
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
    }, [order])

    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    function handleChange(e) {
        setCustomForm({
            ...customForm,
            [e.target.name] : e.target.value
        });
    }

    function handleTypeChange(e) {

        if(document.getElementById('custom_type').value == "phrase") {
            setCustomForm({
                ...customForm,
                [e.target.id] : document.getElementById('custom_type').value,
                price : 4.00
            });
        } else {
            if(document.getElementById('custom_type').value == "word") {
                setCustomForm({
                    ...customForm,
                    [e.target.id] : document.getElementById('custom_type').value,
                    price : 2.00
                });
        } else {
            if (document.getElementById('custom_type').value == "date") {
                setCustomForm({
                    ...customForm,
                    [e.target.id] : document.getElementById('custom_type').value,
                    price : 2.00
                });
            }
        }
        }
    }

    function onOrder(e){
        e.preventDefault()
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
          const customization = {
            custom_type,
            personalization
            }
            const customizationWithPrice = {
                custom_type,
                personalization,
                price: customForm.price  
            }
          fetch("/customizations",{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(customization)
          })
          .then(res => {
              if(res.ok){
                  res.json().then(customization => {
                    setCustomizations([...customizations, customization])
                    const product = {
                        jewelry,
                        customization_id: customization.id,
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
                              res.json().then(product => {navigate(`/cart`)
                              setProductCount(productCount + 1)
                              setOrder({...order,
                                products: [...order.products, product],
                                total: order.total + product.price * quantity + customization.price * quantity})
                            })
                          } else {
                              res.json().then(json => setErrors([...errors, json.errors]))
                          }
                      })
                  })
                } else {
                    res.json().then(json => setErrors([...errors, json.errors]))
                }
          })
    }

    function downClick() {
        if (quantity > 1) {
            setOrderProduct({
                ...orderProduct,
                quantity: quantity - 1
            })
        }
    }

    function upClick() {
            setOrderProduct({
                ...orderProduct,
                quantity: quantity + 1
            })
    }

    return (
        <div>
            <div className="productcontainer">
                <img className="productimg" src={product.img} alt={product.name} width="30%" height="30%"/>
                <br/>
                <div className="productform">Custom Handstamped {productName}
                <br/>
                {viewOrderForm == false && currentCustomer ? <button onClick={onViewClick}>Add to Order</button> : null}
                {viewOrderForm ? <div>
                    <br/>
                    <form onSubmit={onOrder}>
                        Customization Type:
                        <br/>
                        <select id="custom_type" onChange={handleTypeChange}>
                            {typeOptions}
                        </select>
                        <br/>
                        Customization:
                        <br/>
                        <input type="text" name="personalization" value={personalization} onChange={handleChange} />
                        <br/>
                        Quantity:
                        <br/>
                        <input type="button" value="-" onClick={downClick} />
                        {" "}{quantity}{" "}
                        <input type="button" value="+" onClick={upClick} />
                        <br/>
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div> : null}
                </div>
            </div>
        </div>
    )
}

export default AllProducts;
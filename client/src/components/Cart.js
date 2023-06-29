import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';

function Cart({ custAddresses, order, setOrder, orders, custProducts, setCustProducts, setOrders, customizations, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)
    const [errors, setErrors] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [formData, setFormData] = useState({
        address_id: "",
        status: "submitted" 
    })
    const shippingStripe = {
        stripe_key: "price_1NMgq2K92FCM7B9Ez1ZejOIO",
        quantity: 1
    }

    useEffect(() => {
        const identification = order && order[0] ? setOrderId(order[0].id) : null
        const orderSetting = order && order[0] ? setOrder(order[0]) : null
    }, [order])

    const productMap = order.products && order ? order.products.map(product => <ProductCartCard order={order} setOrder={setOrder} custProducts={custProducts} setCustProducts={setCustProducts} product={product} key={product.id} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} customizations={customizations} orderTotalAddition={orderTotalAddition} setOrderTotalAddition={setOrderTotalAddition}/>) : null

    const addressOptions = custAddresses ? custAddresses.map(option => {
        return (<option id="addressSelected" className="addressOption" value={option.id} key={option.id}>{option.name}{" "}-{" "}{option.street}{" "}{option.unit ? option.unit : null},{" "}{option.city}, {option.state} {option.zip}</option>)
    }) : null

    function handleTypeChange(e) {
        setFormData({
            ...formData,
            address_id: document.getElementById("addressSelected").value
        });
    }

    function updateOrders(updatedOrder) {
        const updatingOrders = orders.map((currentOrder) => {
            if (currentOrder.id === orderId) {
                return updatedOrder
            } else {
                return currentOrder
            }
        })
        setOrders(updatingOrders)
    }

    const checkout = async() => {
        const res = await fetch('/checkout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({items: [...order.products, shippingStripe]})
        })
        const json = await res.json();
        if (res.ok) {
            window.location.assign(json.url)
        }
    }

    function orderUpdate(e) {
        e.preventDefault()
        fetch(`orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if(res.ok){
              res.json()
              checkout()
              .then(order => {
                setOrder([])
                updateOrders(order)
                setProductCount(0)
                })
            } else {
              res.json().then(json => setErrors(json.errors))
            }
    })}

    return (
        order.products && productCount !== 0 ?
        <StripeProvider apiKey='pk_test_51NMeYtK92FCM7B9EQ0zptqgDi5YpluL1RMOdZPvIDdJ1nTBQMqV7OvtER3gtzlNRIaGxVvdc6jeMNlQs8EHLz3Ct001tpnBJOK'>
          <div>
            <Elements>
                    <div>
                <h1>Current Cart</h1>
                    { productMap ? productMap : null }
                    <br/>
                    <br/>
                    <p>Flat Rate Shipping: ${ order ? order.shipping : null}</p>
                    <p>Order Total: ${ order ? order.total + orderTotalAddition : null}</p>
                    <form onSubmit={orderUpdate}>
                        Select the Shipping Address:
                        <br/>
                        <select className="addressselect" onChange={handleTypeChange}>
                            <option key="blank" value={" "}>{"Select the shipping Address"}</option>
                            {addressOptions}
                        </select>
                        <br/>
                        <Checkout/>
                        <br/>
                        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                        <br/>
                        <br/>
                    </form>
                    </div> 
                    </Elements>
                    </div>
                    </StripeProvider> : <h1>Current Cart is Empty</h1>
    )
}

export default Cart;
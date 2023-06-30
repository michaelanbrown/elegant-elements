import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

function Cart({ formData, setFormData, custAddresses, order, setOrder, orders, custProducts, setCustProducts, setOrders, customizations, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)
    const [errors, setErrors] = useState(false)
    const [orderId, setOrderId] = useState(null)
    // const [formData, setFormData] = useState({
    //     address_id: "",
    //     status: "submitted" 
    // })
    const [addressData, setAddressData] = useState({
        address_id: ""
    })
    const shippingStripe = {
        stripe_key: "price_1NMgq2K92FCM7B9Ez1ZejOIO",
        quantity: 1
    }
    const stripePromise = loadStripe('pk_test_51NMeYtK92FCM7B9EQ0zptqgDi5YpluL1RMOdZPvIDdJ1nTBQMqV7OvtER3gtzlNRIaGxVvdc6jeMNlQs8EHLz3Ct001tpnBJOK')

    const CheckoutForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const [errorMessage, setErrorMessage] = useState(null)

        const checkout = async(e) => {
            e.preventDefault()
            if (elements === null) {
                return;
            }
            const {error: submitError} = await elements.submit();
            if (submitError) {
                setErrorMessage(submitError.message);
                return;
            }
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
                orderAddressUpdate()
            }
        }
        return (
            <form onSubmit={checkout}>
                <button type="submit" disabled={!stripe || !elements}>
                    Submit Order
                </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        )
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

    // const checkout = async(e) => {
    //     e.preventDefault()
    //     const res = await fetch('/checkout', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({items: [...order.products, shippingStripe]})
    //     })
    //     const json = await res.json();
    //     if (res.ok) {
    //         window.location.assign(json.url)
    //         orderAddressUpdate()
    //     }
    // }

    // function orderUpdate() {
    //     fetch(`orders/${order.id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type" : "application/json",
    //             "Accept" : "application/json"
    //         },
    //         body: JSON.stringify(formData)
    //     }).then((res) => {
    //         if(res.ok){
    //           res.json()
    //           .then(order => {
    //             setOrder([])
    //             updateOrders(order)
    //             setProductCount(0)
    //             })
    //         } else {
    //           res.json().then(json => setErrors(json.errors))
    //         }
    // })}

        function orderAddressUpdate() {
        fetch(`orders/${order.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(addressData)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(order => {
                updateOrders(order)
                })
            } else {
              res.json().then(json => setErrors(json.errors))
            }
    })}

    return (
        order.products && productCount !== 0 ?
        <div>
            <Elements stripe={stripePromise}>
                    <div>
                <h1>Current Cart</h1>
                    { productMap ? productMap : null }
                    <br/>
                    <br/>
                    <p>Flat Rate Shipping: ${ order ? order.shipping : null}</p>
                    <p>Order Total: ${ order ? order.total + orderTotalAddition : null}</p>
                    <form>
                        Select the Shipping Address:
                        <br/>
                        <select className="addressselect" onChange={handleTypeChange}>
                            <option key="blank" value={" "}>{"Select the shipping Address"}</option>
                            {addressOptions}
                        </select>
                        <br/>
                    </form> 
                        <CheckoutForm/>
                        <br/>
                        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                        <br/>
                        <br/>
                    </div> 
                    </Elements>
                    </div> : <h1>Current Cart is Empty</h1>
    )
}

export default Cart;
import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';

function Cart({ custAddresses, order, setOrder, orders, custProducts, setCustProducts, setOrders, customizations, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)
    const [errors, setErrors] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [formData, setFormData] = useState({
        address_id: "",
        status: "submitted"
    })

    useEffect(() => {
        const identification = order && order[0] ? setOrderId(order[0].id) : null
    }, [order])

    const productMap = order[0] && order ? order[0].products.map(product => <ProductCartCard order={order} custProducts={custProducts} setCustProducts={setCustProducts} product={product} key={product.id} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} customizations={customizations} orderTotalAddition={orderTotalAddition} setOrderTotalAddition={setOrderTotalAddition}/>) : null

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

    function orderUpdate(e) {
        e.preventDefault()
        fetch(`orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(formData)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(order => {
                setOrder([])
                updateOrders(order)
                })
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    return (
        order.length !== 0 ?
            <div>
                <h1>Current Cart</h1>
                    { productMap ? productMap : null }
                    <br/>
                    <br/>
                    <p>Flat Rate Shipping: ${ order[0] ? order[0].shipping : null}</p>
                    <p>Order Total: ${ order[0] ? order[0].total + orderTotalAddition : null}</p>
                    <form onSubmit={orderUpdate}>
                        Select the Shipping Address:
                        <br/>
                        <select className="addressselect" onChange={handleTypeChange}>
                            <option key="blank" value={" "}>{"Select the shipping Address"}</option>
                            {addressOptions}
                        </select>
                        <br/>
                        <br/>
                        <button>Submit Order</button>
                    </form>
            </div> : <h1>Current Cart is Empty</h1>
    )
}

export default Cart;
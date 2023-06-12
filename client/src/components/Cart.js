import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';

function Cart({ orders, setOrders, customizations }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [progressOrder, setProgressOrder] = useState(false)
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)

    useEffect(() => {
        const cartOrder = currentCustomer.orders ? currentCustomer.orders.map(order => {
            if (order.status == "in progress") {
                setProgressOrder(order)
                return order
            } else {
                return null
            }
        }) : null
    }, [currentCustomer])

    const order = orders.filter(order => {
        if (order.id == progressOrder.id) {
            return order
        } else {
            return null
        }
    })

    const productMap = order[0] ? order[0].products.map(product => <ProductCartCard product={product} key={product.id} orders={orders} setOrders={setOrders} customizations={customizations} orderTotalAddition={orderTotalAddition} setOrderTotalAddition={setOrderTotalAddition}/>) : null

    return (
        <div>
            <h1>Current Cart</h1>
            { productMap }
            <br/>
            <br/>
            <p>Flat Rate Shipping: ${ order[0] ? order[0].shipping : null}</p>
            <p>Order Total: ${ order[0] ? order[0].total + orderTotalAddition : null}</p>
            <button>Submit Order</button>
            {" "}
            {" "}
        </div>
    )
}

export default Cart;
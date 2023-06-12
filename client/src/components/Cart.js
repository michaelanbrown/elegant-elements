import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';

function Cart({ orders, setOrders, customizations, setCustomizations }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [progressOrder, setProgressOrder] = useState(false)

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

    const productMap = order[0] ? order[0].products.map(product => <ProductCartCard product={product} key={product.id} customizations={customizations} setCustomizations={setCustomizations}/>) : null

    return (
        <div>
            <h1>Current Cart</h1>
            { productMap }
        </div>
    )
}

export default Cart;
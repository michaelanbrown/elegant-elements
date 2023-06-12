import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Cart({ orders, setOrders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [progressOrder, setProgressOrder] = useState([])

    useEffect(() => {
        const cartOrders = currentCustomer.orders ? currentCustomer.orders.map(order => {
            if (order.status == "in progress") {
                setProgressOrder(order)
                return order
            } else {
                return null
            }
        }) : null
    }, [currentCustomer])

    console.log(progressOrder)

    return (
        <div>
            
        </div>
    )
}

export default Cart;
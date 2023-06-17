import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousOrders({ orders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerOrders, setCustomerOrders] = useState([])
    
    useEffect(() => {
        setCustomerOrders(orders.filter(order => {
            if (order.customer_id == currentCustomer.id && order.status !== "in progress") {
                return order
            } else {
                return null
            }
        }))
    }, [orders])

    console.log(customerOrders)

    return (
        <div>
            
        </div>
    )
}

export default PreviousOrders;
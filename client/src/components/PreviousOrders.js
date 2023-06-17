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

    const canceledOrders = customerOrders.filter(order => {
        if(order.status == "canceled") {
            return order
        } else {
            return null
        }
    })

    const completedOrders = customerOrders.filter(order => {
        if(order.status == "completed") {
            return order
        } else {
            return null
        }
    })

    const submittedOrders = customerOrders.filter(order => {
        if(order.status == "submitted") {
            return order
        } else {
            return null
        }
    })

    return (
        <div>
            
        </div>
    )
}

export default PreviousOrders;
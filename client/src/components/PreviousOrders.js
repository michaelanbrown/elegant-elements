import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import OrderCard from './OrderCard';

function PreviousOrders({ orders, products }) {
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

    const canceledOrderMap = canceledOrders.map(order => <OrderCard products={products} order={order} key={order.id}/>)

    return (
        <div>
            Canceled Orders:
            <br/>
            <br/>
            {canceledOrderMap}
        </div>
    )
}

export default PreviousOrders;
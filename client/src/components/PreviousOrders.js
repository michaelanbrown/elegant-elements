import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousOrders() {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerOrders, setCustomerOrders] = useState([])
    
    useEffect(() => {
        const editableOrders = currentCustomer.orders ? currentCustomer.orders.map(order => {
            if (order.editable == true && order.status == "pending") {
                setCustomerOrders([...customerOrders, order])
                return order
            } else {
                return null
            }
        }) : null
    }, [currentCustomer])

    return (
        <div>
            
        </div>
    )
}

export default PreviousOrders;
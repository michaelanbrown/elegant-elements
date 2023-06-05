import React, { useContext, useState }  from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousOrders({ orders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custCustomizations, setCustCustomizations] = useState([])

    const custOrders = orders.map(order => {
        if (order.customer_id == currentCustomer.id) {
            return order.customizations.map(cust => custCustomizations.push(cust))
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
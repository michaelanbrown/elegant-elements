import React, { useContext, useState }  from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousCustomizations({ customizations, setCustomizations, orders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custCustomizations, setCustCustomizations] = useState([])

    const custOrders = orders.map(order => {
        if (order.customer_id == currentCustomer.id) {
            order.customizations.map(cust => custCustomizations.push(cust))
            return order.customizations
        } else {
            return null
        }
    })

    console.log(custCustomizations)

    return (
        <div>

        </div>
    )
}

export default PreviousCustomizations;
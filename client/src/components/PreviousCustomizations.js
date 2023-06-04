import React, { useContext, useState }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Personalizations from './Personalizations';

function PreviousCustomizations({ orders }) {
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

    const personalizationMap = custCustomizations ? <Personalizations custCustomizations={custCustomizations}/> : null

    return (
        <div>
            {personalizationMap}
        </div>
    )
}

export default PreviousCustomizations;
import React, { useContext, useState }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Personalizations from './Personalizations';

function PreviousCustomizations({ orders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custCustomizations, setCustCustomizations] = useState([])

    const custOrders = orders.map(order => {
        if (order.customer_id == currentCustomer.id) {
            return order.customizations.map(cust => custCustomizations.push(cust))
        } else {
            return null
        }
    })

    const personalizationMap = custCustomizations ? custCustomizations.map(cust => <Personalizations key={cust.id} cust={cust}/>) : null

    return (
        <div>
            {personalizationMap}
        </div>
    )
}

export default PreviousCustomizations;
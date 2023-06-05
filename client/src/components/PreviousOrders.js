import React, { useContext, useState, useEffect }  from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousOrders({ orders }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    console.log(currentCustomer)


    return (
        <div>
           
        </div>
    )
}

export default PreviousOrders;
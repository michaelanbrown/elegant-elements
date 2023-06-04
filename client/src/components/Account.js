import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Account() {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    console.log(currentCustomer)

    return (
        <div>

        </div>
    )
}

export default Account;
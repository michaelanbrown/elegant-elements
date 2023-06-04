import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Account() {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const addressMap = currentCustomer.addresses ? currentCustomer.addresses.map(address => {
        return <div className="addresses" key={address.id}>
            {address.street}
            <br/>
            {address.unit ? address.unit : null}
            <br/>
            {address.city}, {address.state} {address.zip}
            <br/>
            <br/>
        </div>
    }) : null

    return (
        <div>
            Name: {currentCustomer.name}
            <br/>
            Email: {currentCustomer.email}
            <br/>
            <br/>
            <br/>
            Addresses:
            <br/>
            <br/>
            {currentCustomer.addresses ? addressMap : null}
        </div>
    )
}

export default Account;
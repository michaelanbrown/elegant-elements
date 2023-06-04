import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Address from './Address';

function Account({ addresses, setAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    const addressMap = currentCustomer ? currentCustomer.addresses.map(address => <Address key={address.id} address={address} addresses={addresses} setAddresses={setAddresses}/>) : null

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
            {addressMap}
        </div>
    )
}

export default Account;
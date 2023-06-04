import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Address from './Address';

function Account({ addresses, setAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custAddresses, setCustAddresses] = useState(currentCustomer.addresses)

    useEffect(() => {
        setCustAddresses(currentCustomer.addresses)
    }, [currentCustomer]) 

    const addressMap = custAddresses ? custAddresses.map(address => <Address key={address.id} address={address} addresses={addresses} setAddresses={setAddresses} custAddresses={custAddresses} setCustAddresses={setCustAddresses}/>) : null

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
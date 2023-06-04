import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Address from './Address';
import { Link } from 'react-router-dom';

function Account({ addresses, setAddresses, custAddresses, setCustAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

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
            <Link className='link' to={`/new-address`}>Add An Address</Link>
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
import React, { useContext, useEffect, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import Address from './Address';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import CreateAddress from './CreateAddress';

function Account({ addresses, setAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custAddresses, setCustAddresses] = useState([])

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
            <Link className='link' to={`/account/new-address`}>Add An Address</Link>
            <Routes>
                <Route path="/new-address/" element={<CreateAddress addresses={addresses} setAddresses={setAddresses} custAddresses={custAddresses} setCustAddresses={setCustAddresses}/>}/>
            </Routes>
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
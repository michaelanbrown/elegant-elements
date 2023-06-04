import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Account({ addresses, setAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    function deleteAddress(){
        fetch(`${address.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok)
            console.log(res)
        })
    }

    const addressMap = currentCustomer.addresses ? currentCustomer.addresses.map(address => {
        return <div className="addresses" key={address.id}>
            {address.street}
            <br/>
            {address.unit ? address.unit : null}
            <br/>
            {address.city}, {address.state} {address.zip}
            <br/>
            <br/>
            <button onClick={deleteAddress}>Delete</button>
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
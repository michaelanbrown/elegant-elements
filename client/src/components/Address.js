import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Address({ address, addresses, setAddresses, custAddresses, setCustAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    function deleteAddress(address) {
        const deletingAddress = addresses.filter((addie) => {
            if (addie.id !== address.id) {
                return address
            }
        })
        setAddresses(deletingAddress)
        const deletingCustAddress = custAddresses.filter((addie) => {
            if (addie.id !== address.id) {
                return address
            }
        })
        setCustAddresses(deletingCustAddress)
    }

    function deleteCustomerAddress(){
        fetch(`/addresses/${address.id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok)
            deleteAddress(address)
        })
    }

    return(
        <div className='address'>
            <br/>
            {address.name}
            <br/>
            {address.street}{address.unit ? ", Unit: " : null}{address.unit ? address.unit : null}
            <br/>
            {address.city}, {address.state} {address.zip}
            <br/>
            <br/>
            <button onClick={deleteCustomerAddress}>Delete</button>
            <br/>
            <br/>
        </div>
    )
}

export default Address;
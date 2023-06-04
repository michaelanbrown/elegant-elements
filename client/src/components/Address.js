import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Address({ address, addresses, setAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    // function deleteAddress(){
    //     fetch(`${address.id}`, {
    //         method: 'DELETE'
    //     })
    //     .then(res => {
    //         if(res.ok)
    //         console.log(res)
    //     })
    // }

    return(
        <div className='address'>
            <br/>
            {address.street}{address.unit ? ", Unit: " : null}{address.unit ? address.unit : null}
            <br/>
            {address.city}, {address.state} {address.zip}
            <br/>
            <br/>
            <button>Delete</button>
            <br/>
            <br/>
        </div>
    )
}

export default Address;
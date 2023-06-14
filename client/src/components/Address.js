import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function Address({ address, addresses, setAddresses, custAddresses, setCustAddresses }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [active, setActive] = useState(false)
    const [formData, setFormData] = useState({
        name: address.name,
        street: address.street,
        unit: address.unit,
        city: address.city,
        state: address.state,
        zip: address.zip,
    })
    const {name, street, unit, city, state, zip} = formData

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

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

    function onUpdateClick() {
        setActive(!active)
    }

    return(
        active == false ? <>
            <div className='address'>
                <br/>
                {address.name}
                <br/>
                {address.street}{address.unit ? ", Unit: " : null}{address.unit ? address.unit : null}
                <br/>
                {address.city}, {address.state} {address.zip}
                <br/>
                <br/>
                <button onClick={onUpdateClick}>Update</button> or <button onClick={deleteCustomerAddress}>Delete</button>
                <br/>
                <br/>
            </div>
        </> :
        <>
            <form >
                Name: <input type="text" name="name" value={name} onChange={handleChange} />
                <br/>
                Street: <input type="text" name="street" value={street} onChange={handleChange} />
                <br/>
                Unit: <input type="text" name="unit" value={unit} onChange={handleChange} />
                <br/>
                City: <input type="text" name="city" value={city} onChange={handleChange} />
                <br/>
                State (Two Letters): <input type="text" name="state" value={state} onChange={handleChange} />
                <br/>
                Zip (5 Digits): <input type="text" name="zip" value={zip} onChange={handleChange} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
            <br/>
        </>
    )
}

export default Address;
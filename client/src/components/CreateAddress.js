import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function CreateAddress(){
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
    })
    const {street, unit, city, state, zip} = formData

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    return(
        <div>
            New Address
            <br/>
            <br/>
            <form>
                Street: <input className='addressform' type="text" name="street" value={street} onChange={handleChange} />
                <br/>
                Unit: <input className='addressform' type="password" name="unit" value={unit} onChange={handleChange} />
                <br/>
                City: <input className='addressform' type="text" name="city" value={city} onChange={handleChange} />
                <br/>
                State: <input className='addressform' type="password" name="state" value={state} onChange={handleChange} />
                <br/>
                Zip: <input className='addressform' type="password" name="zip" value={zip} onChange={handleChange} />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        </div>
    )
}

export default CreateAddress;
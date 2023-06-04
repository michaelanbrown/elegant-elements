import React, { useContext, useState } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function CreateAddress(){
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [errors, setErrors] = useState([])

    return(
        <div>

        </div>
    )
}

export default CreateAddress;
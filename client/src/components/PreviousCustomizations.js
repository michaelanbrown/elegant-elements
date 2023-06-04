import React, { useContext }  from 'react';
import '../App.css'
import { UserContext } from './context/User';

function PreviousCustomizations({ customizations, setCustomizations }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    return (
        <div>

        </div>
    )
}

export default PreviousCustomizations;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'


function Personalizations({ cust }) {
    const customType = cust.custom_type.slice(0,1).toUpperCase() + cust.custom_type.slice(1,cust.custom_type.length)
    const navigate = useNavigate();

    function onClick() {
        navigate(`/`)
    }

    return (
        <div className='customization'>
            {customType} - {cust.personalization}
            <br/>
            <button onClick={onClick}>Order Again</button>
            <br className='break'/>
        </div>
    )
}

export default Personalizations;
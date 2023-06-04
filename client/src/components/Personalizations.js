import React from 'react';
import '../App.css'


function Personalizations({ cust }) {
    const customType = cust.custom_type.slice(0,1).toUpperCase() + cust.custom_type.slice(1,cust.custom_type.length)

    return (
        <div className='customization'>
            {customType} - {cust.personalization}
        </div>
    )
}

export default Personalizations;
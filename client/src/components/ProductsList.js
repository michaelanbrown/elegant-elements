import React, { useEffect, useState } from 'react';
import '../App.css'

function ProductsList({ product, customizations }) {
    const [custCustomization, setCustCustomization] = useState(false)
    
    useEffect(() => {
        (customizations.map(cust => {
            if (cust.id == product.customization_id) {
                setCustCustomization(cust)
                return cust
            }
        }))
    }, [customizations])

    const customType = custCustomization.custom_type ? custCustomization.custom_type : null
    const customizationLine = custCustomization ? <p>Customization: {customType} - "{ custCustomization.personalization }" </p> : null

    return (
        <div className='customization'>
            <br className='break'/>
            Jewelry: {product.jewelry}
            { customizationLine }
            <button>Order Again</button>
            <br/>
            <br/>
        </div>
    )
}

export default ProductsList;
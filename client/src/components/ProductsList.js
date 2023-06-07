import React, { useEffect, useState } from 'react';
import '../App.css'

function ProductsList({ product, customizations }) {
    const [custCustomization, setCustCustomization] = useState(false)
    const productType = product.jewelry.slice(0,1).toUpperCase() + product.jewelry.slice(1,product.jewelry.length)
    
    useEffect(() => {
        (customizations.map(cust => {
            if (cust.id == product.customization_id) {
                setCustCustomization(cust)
                return cust
            }
        }))
    }, [customizations])

    const customType = custCustomization.custom_type ? custCustomization.custom_type.slice(0,1).toUpperCase() + custCustomization.custom_type.slice(1,custCustomization.custom_type.length) : null
    const customizationLine = custCustomization ? <p>Customization: {customType} - "{ custCustomization.personalization }" </p> : null

    return (
        <div className='customization'>
            <br className='break'/>
            Jewelry: {productType}
            { customizationLine }
            <button>Order Again</button>
            <br/>
            <br/>
        </div>
    )
}

export default ProductsList;
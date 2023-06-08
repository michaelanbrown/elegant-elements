import React, { useContext, useState, useEffect }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PreviousProducts({ customizations }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custProducts, setCustProducts] = useState([])

    useEffect(() => {
        setCustProducts(currentCustomer.products)
    }, [currentCustomer])

    const productMap = custProducts ? custProducts.map(product => <ProductsList key={product.id} product={product} customizations={customizations}/>) : <div>No previous products available</div>

    return (
        <div>
           {productMap}
        </div>
    )
}

export default PreviousProducts;
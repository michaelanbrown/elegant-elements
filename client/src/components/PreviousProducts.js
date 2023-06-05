import React, { useContext, useState, useEffect }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PreviousProducts({  }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [custProducts, setCustProducts] = useState([])

    useEffect(() => {
        setCustProducts(currentCustomer.products)
    }, [currentCustomer])

    const productMap = custProducts ? custProducts.map(product => <ProductsList key={product.id} product={product}/>) : null

    return (
        <div>
           {productMap}
        </div>
    )
}

export default PreviousProducts;
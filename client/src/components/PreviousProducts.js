import React, { useContext, useState, useEffect }  from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductsList from './ProductsList';

function PreviousProducts({ orderProducts, custProducts, order, setOrder, customizations, orders, setOrders, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);


    const productMap = custProducts ? custProducts.map(product => <ProductsList key={product.id} orderProducts={orderProducts} product={product} order={order} setOrder={setOrder} customizations={customizations} orders={orders} setOrders={setOrders} productCount={productCount} setProductCount={setProductCount}/>) : null

    return (
        <div>
           {(currentCustomer.products == undefined || currentCustomer.products.length == 0) ? <div>No Previous Products Available </div> : productMap}
        </div>
    )
}

export default PreviousProducts;
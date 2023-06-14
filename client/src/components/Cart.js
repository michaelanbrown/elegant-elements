import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import ProductCartCard from './ProductCartCard';

function Cart({ custAddresses, setCustAddresses, order, orders, custProducts, setCustProducts, setOrders, customizations, productCount, setProductCount }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [orderTotalAddition, setOrderTotalAddition] = useState(0)
console.log(custAddresses)

    const productMap = order[0] && order ? order[0].products.map(product => <ProductCartCard order={order} custProducts={custProducts} setCustProducts={setCustProducts} product={product} key={product.id} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} customizations={customizations} orderTotalAddition={orderTotalAddition} setOrderTotalAddition={setOrderTotalAddition}/>) : null

    const addressOptions = custAddresses ? custAddresses.map(option => {
        return (<option className="addressOption" value={option.id} key={option.id}>{option.name}{" "}-{" "}{option.street}{" "}{option.unit ? option.unit : null},{" "}{option.city}, {option.state} {option.zip}</option>)
    }) : null

    // function handleTypeChange(e) {
    //     setCustomForm({
    //         ...customForm,
    //         [e.target.id] : document.getElementById('custom_type').value
    //     });
    // }

    return (
        <div>
            <h1>Current Cart</h1>
            { productMap ? productMap : null }
            <br/>
            <br/>
            <p>Flat Rate Shipping: ${ order[0] ? order[0].shipping : null}</p>
            <p>Order Total: ${ order[0] ? order[0].total + orderTotalAddition : null}</p>
            <select className='addressselect'>
                {addressOptions}
            </select>
            <br/>
        </div>
    )
}

export default Cart;
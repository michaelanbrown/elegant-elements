import React, { useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import OrderProductCard from './OrderProductCard';

function OrderCard({ order, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);

    const currentProducts = products.filter(product => {
        if (product.order_id == order.id) {
            return product
        } else {
            return null
        }
    })

    const productMap = currentProducts.map(product => <OrderProductCard product={product} key={product.id}/>)

    return (
        <div className='address'>
            {order.created_at}
            <br/>
            <br/>
            {order.address.name}
            <br/>
            {order.address.street}
            <br/>
            {order.address.city}, {order.address.state} {order.address.zip}
            <br/>
            <br/>
            {productMap}
            Shipping: ${order.shipping}
            <br/>
            {order.status == "submitted" ? <div>Total Cost: ${order.total}
            <br/>
            <br/>
            <button>Cancel Order</button></div> : null}
        </div>
    )
}

export default OrderCard;
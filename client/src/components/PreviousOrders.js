import React, { useContext, useState, useEffect } from 'react';
import '../App.css'
import { UserContext } from './context/User';
import OrderCard from './OrderCard';

function PreviousOrders({ orders, setOrders, products }) {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const [customerOrders, setCustomerOrders] = useState([])
    const [search, setSearch] = useState('')
    const statuses = ["canceled", "completed", "submitted"]
    
    useEffect(() => {
        setCustomerOrders(orders.filter(order => {
            if (order.customer_id == currentCustomer.id && order.status !== "in progress") {
                return order
            } else {
                return null
            }
        }))
    }, [orders])

    const canceledOrders = customerOrders.filter(order => {
        if(order.status == "canceled") {
            return order
        } else {
            return null
        }
    })

    const completedOrders = customerOrders.filter(order => {
        if(order.status == "completed") {
            return order
        } else {
            return null
        }
    })

    const submittedOrders = customerOrders.filter(order => {
        if(order.status == "submitted") {
            return order
        } else {
            return null
        }
    })

    const canceledOrderMap = canceledOrders.map(order => <OrderCard products={products} orders={orders} setOrders={setOrders} order={order} key={order.id}/>)

    const completedOrderMap = completedOrders.map(order => <OrderCard products={products} orders={orders} order={order} setOrders={setOrders} key={order.id}/>)

    const submittedOrderMap = submittedOrders.map(order => <OrderCard products={products} orders={orders} order={order} setOrders={setOrders} key={order.id}/>)

    const statusOptions = statuses.map(option => {
        return (<option value={option} key={option}>{option.slice(0,1).toUpperCase() + option.slice(1, option.length)}</option>)
    })

    function handleTypeChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div>
            <select className="addressselect" onChange={handleTypeChange}>
                <option key="blank" value={""}>{"Filter by Status"}</option>
                {statusOptions}
            </select>
            <br/>
            <br/>
            {canceledOrderMap.length !== 0 ? <div>
                Canceled Order(s):
                <br/>
                <br/>
                {canceledOrderMap}
            </div> : null}
            <br/>
            <br/>
            {completedOrderMap.length !== 0 ? <div>
                Fulfilled Order(s):
                <br/>
                <br/>
                {completedOrderMap}
            </div> : null}
            <br/>
            <br/>
            {submittedOrderMap.length !== 0 ? <div>
                Submitted Order(s):
                <br/>
                <br/>
                {submittedOrderMap}
            </div> : null}
        </div>
    )
}

export default PreviousOrders;
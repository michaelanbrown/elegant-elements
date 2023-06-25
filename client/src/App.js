import './App.css';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { UserContext } from './components/context/User';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import PreviousProducts from './components/PreviousProducts';
import Products from './components/Products';
import PreviousOrders from './components/PreviousOrders';
import Cart from './components/Cart';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
  const [customers, setCustomers] = useState([])
  const [addresses, setAddresses] = useState([])
  const [errors, setErrors] = useState([])
  const [customizations, setCustomizations] = useState([])
  const [orders, setOrders] = useState([])
  const [productCount, setProductCount] = useState(currentCustomer.in_progress_product_count)
  const [order, setOrder] = useState([])
  const [orderProducts, setOrderProducts] = useState([])
  const [products, setProducts] = useState([])
  const [custProducts, setCustProducts] = useState([])
  const [progressOrder, setProgressOrder] = useState(false)
  const [custAddresses, setCustAddresses] = useState([])

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((customer) => {
          setCurrentCustomer(customer);
          setCustProducts(customer.products)
          getCustomers();
          getAddresses();
          getCustomizations();
          getProducts();
          setCustAddresses(customer.addresses)
          setProductCount(customer.in_progress_product_count)
          const cartOrder = customer.orders ? customer.orders.map(order => {
            if (order.status == "in progress") {
                setProgressOrder(order)
                return order
            } else {
                return null
            }
          }) : null
          fetch("/orders")
          .then((res) => {
            if(res.ok){
              res.json().then(orders => {
                setOrders(orders)
                setOrder(orders.filter(order => {
                  if (order.status == "in progress" && order.customer_id == customer.id) {
                    setOrderProducts(order.products)
                      return order
                  } else {
                      return null
                  }
              }))})
            } else {
              res.json().then(json => setErrors([json.error]))
            }
          })
        });
      }
    })
  },[])

function getOrders() {
  fetch("/orders")
  .then((res) => {
    if(res.ok){
      res.json().then(setOrders)
    } else {
      res.json().then(json => setErrors([json.error]))
    }
  })
}

  function getCustomers() {
    fetch("/customers")
    .then((res) => {
      if(res.ok){
        res.json().then(setCustomers)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getProducts() {
    fetch("/products")
    .then((res) => {
      if(res.ok){
        res.json().then(setProducts)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getCustomizations() {
    fetch("/customizations")
    .then((res) => {
      if(res.ok){
        res.json().then(setCustomizations)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getAddresses() {
    fetch("/addresses")
    .then((res) => {
      if(res.ok){
        res.json().then(setAddresses)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  return (
    <main>
      <Header productCount={productCount}/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/signup" element={<Signup customers={customers} setCustomers={setCustomers} getProducts={getProducts} getCustomers={getCustomers} getAddresses={getAddresses} getCustomizations={getCustomizations} getOrders={getOrders}/>} />
        <Route path="/login" element={<Login setProductCount={setProductCount} getProducts={getProducts} getCustomers={getCustomers} getAddresses={getAddresses} getCustomizations={getCustomizations} getOrders={getOrders}/>} />
        <Route path="/products" element={<Products customizations={customizations} setCustomizations={setCustomizations} order={order} setOrder={setOrder} orders={orders} setOrders={setOrders} productCount={productCount} setProductCount={setProductCount}/>} />
        <Route path="/account/*" element={<Account addresses={addresses} setAddresses={setAddresses} custAddresses={custAddresses} setCustAddresses={setCustAddresses}/>} />
        <Route path="/previous-products/*" element={<PreviousProducts orderProducts={orderProducts} custProducts={custProducts} order={order} setOrder={setOrder} customizations={customizations} orders={orders} setOrders={setOrders} productCount={productCount} setProductCount={setProductCount}/>} />
        <Route path="/previous-orders" element={<PreviousOrders orders={orders} setOrders={setOrders} products={products}/>} />
        <Route path="/cart" element={<Cart custAddresses={custAddresses} setCustAddresses={setCustAddresses} order={order} setOrder={setOrder} productCount={productCount} setProductCount={setProductCount} orders={orders} setOrders={setOrders} customizations={customizations} setCustomizations={setCustomizations} custProducts={custProducts} setCustProducts={setCustProducts}/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
      </Routes>
    </main>
  );
}

export default App;
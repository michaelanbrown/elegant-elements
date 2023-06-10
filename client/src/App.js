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

function App() {
  const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
  const [customers, setCustomers] = useState([])
  const [addresses, setAddresses] = useState([])
  const [errors, setErrors] = useState([])
  const [customizations, setCustomizations] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((customer) => {
          setCurrentCustomer(customer);
        });
      }
    })
    getCustomers();
    getAddresses();
    getCustomizations();
    getOrders();
  },[])

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

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/signup" element={<Signup customers={customers} setCustomers={setCustomers} getCustomers={getCustomers} getAddresses={getAddresses} getCustomizations={getCustomizations} getOrders={getOrders}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/account/*" element={<Account addresses={addresses} setAddresses={setAddresses}/>} />
        <Route path="/previous-products/*" element={<PreviousProducts customizations={customizations} orders={orders} setOrders={setOrders}/>} />
      </Routes>
    </main>
  );
}

export default App;
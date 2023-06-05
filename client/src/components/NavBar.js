import '../App.css'
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from './context/User';

export default function NavBar ()  {
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        fetch(`/logout`, {
          method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setCurrentCustomer(false)
            navigate(`/`)
          }
        })
      }

    return (
        <nav className="NavBar">
          <br/>
            <NavLink className="Navelements" to="/">Welcome</NavLink>
            <br/>
            { currentCustomer ? null : <NavLink className="Navelements" to="/signup">Signup</NavLink> }
            { currentCustomer ? null : <br/> }
            { currentCustomer ? null : <NavLink className="Navelements" to="/login">Login</NavLink> }
            { currentCustomer ? null : <br/> }
            { currentCustomer ? <NavLink className="Navelements" to="/account">Account Information</NavLink> : null }
            { currentCustomer ? <br/> : null }
            { currentCustomer ? <NavLink className="Navelements" to="/previous-products">Previous Products</NavLink> : null }
            { currentCustomer ? <br/> : null }
            { currentCustomer ? <button className="logout" onClick={handleLogOut}>Logout</button> : null }
        </nav>
    )
}
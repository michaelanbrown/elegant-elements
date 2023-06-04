import '../App.css'
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from './context/User';

export default function NavBar ()  {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        fetch(`/logout`, {
          method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setCurrentUser(false)
            navigate(`/`)
          }
        })
      }

    return (
        <nav className="NavBar">
          <br/>
            <NavLink className="Navelements" to="/">Welcome</NavLink>
            <br/>
            <NavLink className="Navelements" to="/signup">Signup</NavLink>
            <br/>
            <NavLink className="Navelements" to="/login">Login</NavLink>
            <br/>
            { currentUser ? <button className="logout" onClick={handleLogOut}>Logout</button> : null }
        </nav>
    )
}
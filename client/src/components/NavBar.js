import React from "react";
// import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { UserContext } from '../context/User';

export default function NavBar ()  {
    // const { currentUser, setCurrentUser } = useContext(UserContext);

    return (
        <nav className="NavBar">
          <br/>
            <NavLink className="Navelements" to="/">Welcome</NavLink>
        </nav>
    )
}
import React from "react";
import NavBar from "./NavBar";

function Header() {

  return (
    <div className="Header">
      <header>
        <div>
            <h1 className="elegant-header">Elegant Elements</h1>
            <p className="active"><em>✨Adding a touch of inspiration and elegance to your every day life✨</em></p>
            <NavBar />
        </div>  
      </header>
    </div>
  );
}

export default Header;
import React from "react";
import NavBar from "./NavBar";

function Header() {

  return (
    <div className="Header">
      <header>
        <h1>
        <span role="img" aria-label="plane"></span>✨Elegant Elements✨<span role="img" aria-label="globe"></span>
        <br/>
        </h1>
          <p><em>Adding a touch of inspiration and elegance to your every day life</em></p>
        <div>
            <NavBar />
        </div>  
      </header>
    </div>
  );
}

export default Header;
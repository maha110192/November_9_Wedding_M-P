import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const AppHero = () => {
    return (
      <div id="home" className="hero-block">
        <div className="header__content">
          <div className="header__title-wrapper">
          <span className="header__subtitle">We are getting married</span>
            <h1 className="header__title">Daniela Paola<br></br>
            <small>&</small> <br></br>
            Miguel Angel</h1>
            {/* <span className="header__subtitle">We are getting married</span> */}
            <h2 className="header__date">November 9, 2024</h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default AppHero;

 
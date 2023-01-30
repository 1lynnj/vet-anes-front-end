import React from "react";
import "./Header.css";
// import vet_logo from "../vet_logo.png";
import veterinary_logo from "../veterinary_logo.jpg";

const Header = () => {
  return (
    <header className="site-header pe-4">
      <div className="row d-flex align-items-end">
        <div className="col-xs-12 col-sm-10 d-flex align-items-end">
          <img src={veterinary_logo} alt="logo" />
          <h1>eterinary Anesthesia Protocol</h1>
        </div>
        <div className="col-xs-12 col-sm-2 text-xs-start text-sm-end">
          <button className="btn btn-primary" type="submit">
            New Patient
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

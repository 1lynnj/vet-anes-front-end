import React from "react";
import "./Header.css";
import vet_logo from "../vet_logo.png";

const Header = () => {
  return (
    <header className="site-header">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-10">
              <img src={vet_logo} alt="logo" />
              <h1>Veterinary Anesthesia Protocol</h1>
            </div>
            <div className="col-2">
              <button className="btn btn-primary" type="submit">
                New Patient
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import "./Header.css";
import vetLogo from "../vetLogo7.png";

const Header = (props) => {
  return (
    <header className="site-header pe-4">
      <div className="row d-flex align-items-end">
        <div className="col-xs-12 col-sm-10 d-flex align-items-center pt-3">
          <img src={vetLogo} alt="logo" />
          <h1>Veterinary Anesthesia Protocol</h1>
        </div>
        <div className="col-xs-12 col-sm-2 text-xs-start text-sm-end">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => {
              props.newPatient();
            }}
          >
            New Patient
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

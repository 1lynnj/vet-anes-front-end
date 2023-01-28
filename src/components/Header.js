import React from "react";
import "./Header.css";
import vet_logo from "../vet_logo.jpg";

const Header = () => {
  return (
    <div className="header">
      <img src={vet_logo} alt="logo" />
      <h1>Veterinary Anesthesia Protocol</h1>
    </div>
  );
};

export default Header;

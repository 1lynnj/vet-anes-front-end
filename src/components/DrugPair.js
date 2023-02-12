import React from "react";
import { useEffect, useState } from "react";

const DrugPair = ({ description, drugOne, drugTwo }) => {
  console.log(`🐝${JSON.stringify(drugOne)}`);
  return (
    <li
      className="list-unstyled bg-warning-subtle text-warning-emphasis"
      id="drug-pair"
    >
      <i className="fa-solid fa-triangle-exclamation"></i> {description}{" "}
      {drugOne} {drugTwo}
    </li>
  );
};

export default DrugPair;

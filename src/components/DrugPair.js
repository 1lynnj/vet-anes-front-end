import React from "react";
import { useEffect, useState } from "react";

const DrugPair = ({ description, drugOne, drugTwo }) => {
  console.log(`🐝${JSON.stringify(drugOne)}`);
  return (
    <li className="list-unstyled" id="drug-pair">
      {description} {drugOne} {drugTwo}
    </li>
  );
};

export default DrugPair;

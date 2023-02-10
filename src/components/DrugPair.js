import React from "react";
import { useEffect, useState } from "react";

const DrugPair = ({ description, drugOne, drugTwo }) => {
  console.log(`🐝${JSON.stringify(drugOne)}`);
  return (
    <li className="list-unstyled">
      {description} {drugOne} {drugTwo}
    </li>
  );
};

export default DrugPair;

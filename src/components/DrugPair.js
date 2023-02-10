import React from "react";
import { useEffect, useState } from "react";

const DrugPair = ({ description, updatedDrugList }) => {
  return <li className="list-unstyled">{description}</li>;
};

export default DrugPair;

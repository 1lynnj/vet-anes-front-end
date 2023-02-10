import React from "react";
import { useEffect, useState } from "react";

const DrugPair = ({ description, updatedDrugList }) => {
  const emptyPair = {};
  const [selectedPair, setSelectedPair] = useState(emptyPair);

  useEffect(() => {
    if (!description) {
      setSelectedPair(emptyPair);
    }
  }, [updatedDrugList]);

  return <li className="list-unstyled">{description}</li>;
};

export default DrugPair;

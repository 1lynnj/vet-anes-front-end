import React from "react";
import "./ERDrug.css";

const ERDrug = (props) => {
  let drugData = { ...props.drugData };
  console.log(`***********${JSON.stringify(props)}`);
  return (
    <tr>
      <td>{drugData.drug}</td>
      <td className="er-volume er-drug-col">{drugData.volume}</td>
      <td className="er-drug-col">{drugData.dose}</td>
      <td className="er-drug-col">{drugData.concentration}</td>
    </tr>
  );
};

export default ERDrug;

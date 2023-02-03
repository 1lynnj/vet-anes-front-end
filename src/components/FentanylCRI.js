import React from "react";

const FentanylCRI = (props) => {
  let drugData = { ...props.drugData };
  return (
    <tr>
      <td className="fentanyl-cri-dose fentanyl-cri-col">{drugData.dose}</td>
      <td className="fentanyl-cri-rate fentanyl-cri-col">{drugData.rate}</td>
      <td className="fentanyl-cri-increment fentanyl-cri-col">ml/hr</td>
    </tr>
  );
};

export default FentanylCRI;

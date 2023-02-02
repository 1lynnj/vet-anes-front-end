import React from "react";

const FluidRate = (props) => {
  let drugData = { ...props.drugData };
  return (
    <tr>
      <td className="fluid-rate-name fluid-rate-col">{drugData.rate_name}</td>
      <td className="fluid-rate-rate fluid-rate-col">{drugData.fluid_rate}</td>
      <td className="fluid-rate-increment fluid-rate-col">
        {drugData.fluid_rate_increment}
      </td>
      <td className="fluid-rate-note fluid-rate-col">
        {drugData.administration_note}
      </td>
    </tr>
  );
};

export default FluidRate;

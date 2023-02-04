import React from "react";
import FluidRate from "./FluidRate";

const FluidRatesList = (props) => {
  return (
    <table className="table">
      <tbody>
        <tr className="table-head">
          <td colSpan="5">
            <h4>Fluids:</h4>
          </td>
        </tr>

        <FluidRate
          className="fluid-rate-col"
          drugData={props.fluidRatesList[0]}
        ></FluidRate>
        <FluidRate
          className="fluid-rate-col"
          drugData={props.fluidRatesList[1]}
        ></FluidRate>
        <FluidRate
          className="fluid-rate-col"
          drugData={props.fluidRatesList[2]}
        ></FluidRate>
        <FluidRate
          className="fluid-rate-col"
          drugData={props.fluidRatesList[3]}
        ></FluidRate>
        <FluidRate
          className="fluid-rate-col"
          drugData={props.fluidRatesList[4]}
        ></FluidRate>
      </tbody>
    </table>
  );
};

export default FluidRatesList;

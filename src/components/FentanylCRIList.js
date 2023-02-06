import React from "react";
import FentanylCRI from "./FentanylCRI";
import "./FentanylCRIList.css";

const FentanylCRIList = (props) => {
  return (
    <table className="table">
      <tbody>
        <tr className="table-head">
          <td className="table-head-container" colSpan="5">
            <h4>Fentanyl CRI (mcg/kg/hr):</h4>
          </td>
        </tr>

        <FentanylCRI
          className="fluid-rate-col"
          drugData={props.fentanylCRIList[0]}
        ></FentanylCRI>
        <FentanylCRI
          className="fluid-rate-col"
          drugData={props.fentanylCRIList[1]}
        ></FentanylCRI>
        <FentanylCRI
          className="fluid-rate-col"
          drugData={props.fentanylCRIList[2]}
        ></FentanylCRI>
        <FentanylCRI
          className="fluid-rate-col"
          drugData={props.fentanylCRIList[3]}
        ></FentanylCRI>
        <FentanylCRI
          className="fluid-rate-col"
          drugData={props.fentanylCRIList[4]}
        ></FentanylCRI>
      </tbody>
    </table>
  );
};

export default FentanylCRIList;

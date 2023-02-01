import React from "react";
import ERDrug from "./ERDrug";
import "./ERDrugList.css";

const ERDrugList = (props) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <td colSpan="5">
            <h4>Emergency Drugs:</h4>
          </td>
        </tr>
        <tr>
          <th style={{ width: "35%" }}>Drug</th>
          <th className="er-drug-col" style={{ width: "10%" }}>
            Vol(ml) IV
          </th>
          <th className="er-drug-col" style={{ width: "10%" }}>
            (mg/kg)
          </th>
          <th className="er-drug-col" style={{ width: "10%" }}>
            Dose(mg)
          </th>
        </tr>
        <ERDrug drugData={props.erDrugList[0]}></ERDrug>

        <ERDrug drugData={props.erDrugList[1]}></ERDrug>

        <ERDrug drugData={props.erDrugList[2]}></ERDrug>

        <ERDrug drugData={props.erDrugList[3]}></ERDrug>

        <ERDrug drugData={props.erDrugList[4]}></ERDrug>

        <ERDrug drugData={props.erDrugList[5]}></ERDrug>

        <ERDrug drugData={props.erDrugList[6]}></ERDrug>

        <ERDrug drugData={props.erDrugList[7]}></ERDrug>

        <ERDrug drugData={props.erDrugList[8]}></ERDrug>

        <ERDrug drugData={props.erDrugList[9]}></ERDrug>
      </tbody>
    </table>
  );
};

export default ERDrugList;

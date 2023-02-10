import { useState } from "react";
import OralDrugInput from "./OralDrugInput";

const DrugInteractionsForm = (props) => {
  const [formData, setFormData] = useState(props.protocolDrugList);
  const onDrugInteractionsSubmit = (event) => {
    event.preventDefault();
    setFormData(props.protocolDrugList);
    props.updateInteractionsDrugList(props.protocolDrugList);
  };
  return (
    <div>
      <form onChange={onDrugInteractionsSubmit}>
        <table className="table">
          <tbody>
            <tr className="table-head">
              <td className="table-head-container" colSpan="5">
                <h4>Current Oral Medications:</h4>
              </td>
            </tr>
            <tr>
              <th style={{ width: "35%" }}>Drug</th>
            </tr>
            <OralDrugInput
              drugData={props.protocolDrugList[10]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></OralDrugInput>
            <OralDrugInput
              drugData={props.protocolDrugList[11]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></OralDrugInput>
            <OralDrugInput
              drugData={props.protocolDrugList[12]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></OralDrugInput>
            <OralDrugInput
              drugData={props.protocolDrugList[13]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></OralDrugInput>
            <OralDrugInput
              drugData={props.protocolDrugList[14]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></OralDrugInput>
            <tr className="trailing-row"></tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default DrugInteractionsForm;

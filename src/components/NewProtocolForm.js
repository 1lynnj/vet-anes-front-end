import { useState } from "react";
import NewDrugInput from "./NewDrugInput";
import "../index.css";

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(props.protocolDrugList);
  const onNewProtocolFormSubmit = (event) => {
    event.preventDefault();
    setFormData(props.protocolDrugList);
    props.updateInteractionsDrugList(props.protocolDrugList);
  };

  // TO DO: long-term goal - refactor to allow user to add as many drugs as required
  // rather than hard coded
  // TO DO: Move inline styling to css
  return (
    <div>
      <h4>Protocol:</h4>
      <p id="protocol-instructions">
        Enter drugs and dosages as indicated for custom anesthestic protocol or
        use Healthy Pet protocol for routine surgeries. Submit protocol when
        complete.
      </p>
      <form onChange={onNewProtocolFormSubmit}>
        <table className="table">
          <tbody>
            <tr className="table-head">
              <td className="table-head-container" colSpan="5">
                <h4>Premedications:</h4>
              </td>
            </tr>
            <tr>
              <th style={{ width: "35%" }}>Drug</th>
              <th style={{ width: "15%" }}>
                Dose<sup>*</sup> (mg/kg)
              </th>
              <th style={{ width: "25%" }}>Vol (ml)</th>
              <th style={{ width: "25%" }}>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[0]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[1]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[2]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <tr className="trailing-row"></tr>
          </tbody>
          <tbody>
            <tr className="table-head">
              <td className="table-head-container" colSpan="5">
                <h4>Induction:</h4>
              </td>
            </tr>
            <tr className="label-row">
              <th>Drug</th>
              <th>
                Dose<sup>*</sup> (mg/kg)
              </th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[3]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[4]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[5]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <tr className="trailing-row"></tr>
          </tbody>

          <tbody>
            <tr className="table-head">
              <td className="table-head-container" colSpan="5">
                <h4>Other medications administered at anesthesia:</h4>
              </td>
            </tr>
            <tr>
              <th>Drug</th>
              <th>
                Dose<sup>*</sup> (mg/kg)
              </th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[6]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[7]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[8]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[9]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
              updateInteractionsDrugList={props.updateInteractionsDrugList}
            ></NewDrugInput>
          </tbody>
          <tbody>
            <tr className="trailing-row"></tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewProtocolForm;

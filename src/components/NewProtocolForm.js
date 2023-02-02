import { useState } from "react";
import NewDrugInput from "./NewDrugInput";

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(props.protocolDrugList);
  const onNewProtocolFormSubmit = (event) => {
    event.preventDefault();
    setFormData({});
  };

  return (
    <div>
      <form onChange={onNewProtocolFormSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td colSpan="5">
                <h4>Premedications:</h4>
              </td>
            </tr>
            <tr>
              <th style={{ width: "35%" }}>Drug</th>
              <th style={{ width: "15%" }}>
                Dose<p>(mcg or mg/kg)</p>
              </th>
              <th style={{ width: "25%" }}>Vol (ml)</th>
              <th style={{ width: "25%" }}>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[0]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[1]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[2]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
          </tbody>
          <tbody>
            <tr>
              <td colSpan="5">
                <h4>Induction:</h4>
              </td>
            </tr>
            <tr>
              <th>Drug</th>
              <th>Dose</th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[3]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[4]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[5]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
          </tbody>

          <tbody>
            <tr>
              <td colSpan="5">
                <h4>Other medications administered at anesthesia:</h4>
              </td>
            </tr>
            <tr>
              <th>Drug</th>
              <th>Dose</th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.protocolDrugList[6]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[7]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[8]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.protocolDrugList[9]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewProtocolForm;

import { useState } from "react";
import NewDrugInput from "./NewDrugInput";

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(props.newDrugInputs);
  const onNewProtocolFormSubmit = (event) => {
    event.preventDefault();
    // props.sendNewProtocolToApp(formData);
    // props.loadProtocolDrugList(drugs);
    setFormData({});
  };
  return (
    <div>
      <form onChange={onNewProtocolFormSubmit}>
        <input type="submit" value={"Submit Form"} />
        <table className="table">
          <tbody>
            <tr>
              <td colSpan="5">
                <h3>Predmedications:</h3>
              </td>
            </tr>
            <tr>
              <th style={{ width: "35%" }}>Drug</th>
              <th style={{ width: "15%" }}>Dose</th>
              <th style={{ width: "25%" }}>Vol (ml)</th>
              <th style={{ width: "25%" }}>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.newDrugInputs[0]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[1]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[2]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
          </tbody>
          <tbody>
            <tr>
              <td colSpan="5">
                <h3>Induction:</h3>
              </td>
            </tr>
            <tr>
              <th>Drug</th>
              <th>Dose</th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.newDrugInputs[3]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[4]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[5]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
          </tbody>

          <tbody>
            <tr>
              <td colSpan="5">
                <h3>Other medications administered at anesthesia:</h3>
              </td>
            </tr>
            <tr>
              <th>Drug</th>
              <th>Dose</th>
              <th>Vol (ml)</th>
              <th>Route</th>
            </tr>
            <NewDrugInput
              drugData={props.newDrugInputs[6]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[7]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[8]}
              updateDrugList={props.updateDrugList}
              drugOptions={props.drugOptions}
            ></NewDrugInput>
            <NewDrugInput
              drugData={props.newDrugInputs[9]}
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

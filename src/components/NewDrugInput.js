import React from "react";
import { useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
  // console.log(`😤${JSON.stringify(props)}`);
  let drugData = { ...props.drugData };
  const [newDrugInput, setNewDrugInput] = useState(props.drugData);

  const onDrugChange = (drugId) => {
    console.log(`😄${drugId}`);
    console.log("on drug change called");
    // Update the data with the change from the input
    let updatedDrugData = {
      ...props.drugData,
      drugId: drugId,
    };
    console.log(`inside component, ${JSON.stringify(updatedDrugData)}`);
    props.updateDrugList(updatedDrugData);
    setNewDrugInput(updatedDrugData);
  };

  const onDoseChange = (e) => {
    // Update the data with the change from the input
    let updatedDrugData = {
      ...props.drugData,
      dose: e.target.value,
    };
    console.log(`inside component, ${JSON.stringify(updatedDrugData)}`);
    props.updateDrugList(updatedDrugData);
    setNewDrugInput(updatedDrugData);
  };

  return (
    <tr>
      <td>
        <Select
          options={props.drugOptions}
          onChange={(selectedOption) =>
            selectedOption ? onDrugChange(selectedOption.value) : null
          }
          isClearable
        />
      </td>
      <td>
        <input
          placeholder="μg or mg /kg"
          className="form-control"
          type="number"
          id="dose"
          name="dose"
          value={drugData.dose}
          onChange={onDoseChange}
        />
      </td>
      <td>{drugData.volume}</td>
      <td>{drugData.route}</td>
    </tr>
  );
};

export default NewDrugInput;

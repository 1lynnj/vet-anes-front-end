import React from "react";
import { useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
  let drugData = { ...props.drugData };
  const [newDrugInput, setNewDrugInput] = useState(props.drugData);

  const onDrugChange = (drugId) => {
    console.log("on drug change called");
    // Update the data with the change from the input
    let updatedDrugData = {
      ...props.drugData,
      drugId: drugId,
    };

    props.updateDrugList(updatedDrugData);
    setNewDrugInput(updatedDrugData);
  };

  const onDoseChange = (e) => {
    // Update the data with the change from the input
    let updatedDrugData = {
      ...props.drugData,
      dose: e.target.value,
    };
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

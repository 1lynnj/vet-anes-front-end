import React from "react";
import { useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
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

  // console.log(`doot----> ${JSON.stringify(props.pqqqqqqqqq)}`);

  // const updateVolAndRoute = () => {
  //   for (let drug in pqqqqqqqqq) {
  //     let updatedDrugData = {
  //       ...drugData,
  //       volume: drug.volume,
  //       route: drug.route,
  //     };
  //     setNewDrugInput(updatedDrugData);
  //   }
  // };

  return (
    <tr>
      <td>
        {/* <input
          className="form-control"
          type="text"
          id="drug"
          name="drug"
          value={newDrugInput.drug}
          onChange={onDrugChange}
          foo="1. when this changes, we call onDrugChange"
        /> */}
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

      {/* <label htmlFor="drugSet"></label>
      <input
        type="text"
        id="drugSet"
        name="drugSet"
        value={drugData.drugSet}
        onChange={handleUserEntry}
      /> */}
    </tr>
  );
};

export default NewDrugInput;

import React from "react";
import { useState } from "react";

const NewDrugInput = (props) => {
  let drugData = { ...props.drugData };
  const [newDrugInput, setNewDrugInput] = useState(drugData);

  const onDrugChange = (e) => {
    // Update the data with the change from the input
    let updatedDrugData = {
      ...props.drugData,
      drug: e.target.value,
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
    <div>
      <label htmlFor="drug">Drug:</label>
      <input
        type="text"
        id="drug"
        name="drug"
        value={newDrugInput.drug}
        onChange={onDrugChange}
        foo="1. when this changes, we call onDrugChange"
      />
      <label htmlFor="dose">Dose:</label>
      <input
        type="number"
        id="dose"
        name="dose"
        value={newDrugInput.dose}
        onChange={onDoseChange}
      />
      {/* <label htmlFor="drugSet"></label>
      <input
        type="text"
        id="drugSet"
        name="drugSet"
        value={drugData.drugSet}
        onChange={handleUserEntry}
      /> */}
    </div>
  );
};

export default NewDrugInput;

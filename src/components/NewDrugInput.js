import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
  let drugData = props.drugData;
  const emptyDrug = { value: null, label: "" };
  const [selectedDrug, setSelectedDrug] = useState(emptyDrug);

  useEffect(() => {
    if (!props.drugData.drugId) {
      setSelectedDrug(emptyDrug);
    }
  }, [props.drugData]);

  const onDrugChange = (drug) => {
    console.log("on drug change called");
    // Update the data with the change from the input
    setSelectedDrug(drug);
    let updatedDrugData = {
      ...props.drugData,
      drugId: drug.value,
    };
    props.updateDrugList(updatedDrugData);
  };

  const onDoseChange = (e) => {
    // Update the data with the change from the input
    let updatedDrugData = {
      ...drugData,
      dose: e.target.value,
    };
    props.updateDrugList(updatedDrugData);
  };

  return (
    <tr>
      <td>
        <Select
          options={props.drugOptions}
          value={selectedDrug}
          onChange={(selectedOption) =>
            selectedOption.value ? onDrugChange(selectedOption) : null
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

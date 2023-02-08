import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
  let drugData = props.drugData;
  const emptyDrug = { value: null, label: "" };
  const [selectedDrug, setSelectedDrug] = useState(emptyDrug);

  const autoPopulateDrug = () => {
    if (props.drugData.drugId) {
      for (let drugOption of props.drugOptions) {
        if (drugOption.value === drugData.drugId) {
          setSelectedDrug(drugOption);
        }
      }
    }
  };

  useEffect(() => {
    if (!drugData.drugId) {
      setSelectedDrug(emptyDrug);
    } else {
      autoPopulateDrug();
    }
  }, [drugData]);

  const onDrugChange = (drug) => {
    setSelectedDrug(drug);
    let updatedDrugData = {
      ...drugData,
      drugId: drug.value,
      rxcui_code: drug.rxcui_code,
    };
    console.log(
      `🩴${JSON.stringify(updatedDrugData)} ${JSON.stringify(
        updatedDrugData.drugId
      )} ${JSON.stringify(updatedDrugData.rxcui_code)}`
    );
    props.updateDrugList(updatedDrugData);
  };

  const onDoseChange = (e) => {
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
      <td className="align-middle">{drugData.volume}</td>
      <td className="align-middle">{drugData.route}</td>
    </tr>
  );
};

export default NewDrugInput;

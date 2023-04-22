import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

const NewDrugInput = (props) => {
  const species = props.patientInfo.species;
  let drugData = props.drugData;
  const emptyDrug = { value: null, label: "" };
  const [selectedDrug, setSelectedDrug] = useState(emptyDrug);
  const [lowDose, setLowDose] = useState(null);
  const [highDose, setHighDose] = useState(null);

  const autoPopulateDrug = () => {
    if (props.drugData.drugId) {
      for (let drugOption of props.drugOptions) {
        if (drugOption.value === props.drugData.drugId) {
          setSelectedDrug(drugOption);
        }
      }
    }
  };

  useEffect(() => {
    if (!props.drugData.drugId) {
      setSelectedDrug(emptyDrug);
    } else {
      autoPopulateDrug();
    }
  }, [props.drugData]);

  // TODO: Add dose ranges to drug table to alert user when out of range
  const onDrugChange = (drug) => {
    setSelectedDrug(drug);

    if (species === "Cat") {
      setLowDose(drug.cat_low_dose);
      setHighDose(drug.cat_high_dose);
    } else {
      setLowDose(drug.dog_low_dose);
      setHighDose(drug.dog_high_dose);
    }
    // console.log(`after: ${lowDose}`);
    let updatedDrugData = {
      ...props.drugData,
      drugId: drug.value,
      rxcui_code: drug.rxcui_code,
      lowDose: drug.cat_low_dose,
      highDose: highDose,
    };
    props.updateDrugList(updatedDrugData);
  };

  const onDoseChange = (e) => {
    let updatedDrugData = {
      ...props.drugData,
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
            selectedOption && selectedOption.value
              ? onDrugChange(selectedOption)
              : onDrugChange(emptyDrug)
          }
          isClearable
        />
        Dose Range:{lowDose} mg/kg - {highDose} mg/kg
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

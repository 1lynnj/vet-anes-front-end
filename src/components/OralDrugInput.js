import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";

const OralDrugInput = (props) => {
  let drugData = props.drugData;
  const emptyDrug = { value: null, label: "" };
  const [selectedDrug, setSelectedDrug] = useState(emptyDrug);

  useEffect(() => {
    if (!props.drugData.drugId) {
      setSelectedDrug(emptyDrug);
    }
  }, [drugData]);

  const onDrugChange = (drug) => {
    console.log(`on oral meds change called`);
    setSelectedDrug(drug);
    let updatedDrugData = {
      ...props.drugData,
      drugId: drug.value,
      rxcui_code: drug.rxcui_code,
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
    </tr>
  );
};

export default OralDrugInput;

import React from "react";
import { useState } from "react";

const INITIAL_FORM_DATA = {
  weight: "",
};

const PatientWeightForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const handleUserEntry = (e) => {
    let formField = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: formField,
    };
    setFormData(newFormData);
  };

  const onPatientWeightChange = (e) => {
    e.preventDefault();
    props.sendPatientWeightToApp({
      weight: formData.weight,
    });
  };

  return (
    <div>
      <form onChange={onPatientWeightChange}>
        <div>
          <label htmlFor="patientWeight">WEIGHT:</label>
          <input
            placeholder="weight in kg"
            name="weight"
            value={formData.weight}
            onChange={handleUserEntry}
          />
        </div>
      </form>
    </div>
  );
};

export default PatientWeightForm;

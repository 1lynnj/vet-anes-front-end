import React from "react";
import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  signalment: "",
};

const PatientInfoForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const handleUserEntry = (e) => {
    let formField = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: formField,
    };
    setFormData(newFormData);
  };

  const onPatientInfoChange = (e) => {
    e.preventDefault();
    props.sendPatientInfoToApp({
      name: formData.name,
      signalment: formData.signalment,
    });
  };

  return (
    <div>
      <form onChange={onPatientInfoChange}>
        <div>
          <label htmlFor="patientName">Name:</label>
          <input
            placeholder="Patient First and Last Name"
            name="name"
            value={formData.name}
            onChange={handleUserEntry}
          />
        </div>
        <div>
          <label htmlFor="patientSignalment">Signalment:</label>
          <input
            placeholder="Age, Sex and Reproductive Status, Breed"
            name="signalment"
            value={formData.signalment}
            onChange={handleUserEntry}
          />
        </div>
      </form>
    </div>
  );
};

export default PatientInfoForm;

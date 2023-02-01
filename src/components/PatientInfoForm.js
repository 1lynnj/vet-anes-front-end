import React from "react";
import { useState, useEffect } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  signalment: "",
  weight: "",
};

const PatientInfoForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleUserEntry = (e) => {
    let formField = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: formField,
    };
    setFormData(newFormData);
    props.setPatientInfo(newFormData);
  };

  return (
    <form className="patient-information row">
      <h4>Patient Information:</h4>
      <div className="mb-3 col-12 col-sm-4">
        <label htmlFor="patientName" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="patientName"
          aria-describedby="patientName"
          placeholder="Patient First and Last Name"
          name="name"
          value={formData.name}
          onChange={handleUserEntry}
        />
      </div>
      <div className="mb-3 col-12 col-sm-4">
        <label htmlFor="patientSignalment" className="form-label">
          Signalment:
        </label>
        <input
          type="text"
          className="form-control"
          id="patientSignalment"
          aria-describedby="patientSignalment"
          placeholder="Age, Sex and Reproductive Status, Breed"
          name="signalment"
          value={formData.signalment}
          onChange={handleUserEntry}
        />
      </div>
      <div className="mb-3 col-12 col-sm-4">
        <label htmlFor="patientWeight" className="form-label">
          Weight:
        </label>
        <input
          type="number"
          className="form-control"
          id="patientWeight"
          aria-describedby="patientWeight"
          placeholder="Weight in KG"
          name="weight"
          value={formData.weight}
          onChange={handleUserEntry}
        />
      </div>
      {/* <input type="submit" value="Add Patient Information" /> */}
    </form>
  );
};

export default PatientInfoForm;

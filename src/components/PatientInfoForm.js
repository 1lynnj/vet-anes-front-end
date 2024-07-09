import React from "react";
import { useState, useEffect } from "react";

const PatientInfoForm = (props) => {
  let patientInfo = { ...props.patientInfo };
  const [formData, setFormData] = useState(patientInfo);
  const clearSpecies = { value: null, label: "" };
  const [selectedSpecies, setSelectedSpecies] = useState(clearSpecies);

  const handleUserEntry = (e) => {
    let formFieldValue = e.target.value;
    const newFormData = {
      ...formData,
      [e.target.name]: formFieldValue,
    };
    setFormData(newFormData);
    props.setPatientInfo(newFormData);
    props.onPatientInfoChange(newFormData);

    if (e.target.name === "species") {
      setSelectedSpecies({ value: formFieldValue, label: formFieldValue });
    }
  };

  useEffect(() => {
    setSelectedSpecies(patientInfo.species);
  }, [patientInfo.species]);

  return (
    <form className="patient-information row">
      <h4 className="patient-information-header">Patient Information:</h4>
      <div className="mb-3 col-12 col-sm-3 patient-name">
        <label htmlFor="patientName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="patientName"
          aria-describedby="patientName"
          name="name"
          value={props.patientInfo.name}
          onChange={handleUserEntry}
        />
        <p id="form-descriptions">Patient First and Last Name</p>
      </div>
      <div className="mb-3 col-12 col-sm-3 patient-species">
        <label htmlFor="patientSpecies" className="form-label">
          Species<sup>*</sup>
        </label>
        <select
          className="form-select"
          name="species"
          value={selectedSpecies}
          onChange={handleUserEntry}
        >
          <option value=""></option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
        </select>

        <p id="form-descriptions">Select Cat or Dog</p>
      </div>
      <div className="mb-3 col-12 col-sm-3 patient-signalment">
        <label htmlFor="patientSignalment" className="form-label">
          Signalment
        </label>
        <input
          type="text"
          className="form-control"
          id="patientSignalment"
          aria-describedby="patientSignalment"
          name="signalment"
          value={props.patientInfo.signalment}
          onChange={handleUserEntry}
        />
        <p id="form-descriptions">Age, Sex and Reproductive Status, Breed</p>
      </div>
      <div className="mb-3 col-12 col-sm-3 patient-weight">
        <label htmlFor="patientWeight" className="form-label">
          Weight<sup>*</sup>
        </label>
        <input
          type="number"
          className="form-control"
          id="patientWeight"
          aria-describedby="patientWeight"
          name="weight"
          value={props.patientInfo.weight}
          onChange={handleUserEntry}
        />
        <p id="form-descriptions">Weight in kg</p>
      </div>
      <div>
        <button
          id="submit-protocol"
          className="btn btn-primary float-end"
          onClick={props.populateHealthyPet}
        >
          Healthy Pet
        </button>
      </div>
      <p id="page-divider"></p>
    </form>
  );
};

export default PatientInfoForm;

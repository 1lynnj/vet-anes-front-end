import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";

const PatientInfoForm = (props) => {
  let patientInfo = { ...props.patientInfo };
  const [formData, setFormData] = useState(patientInfo);
  const clearSpecies = { value: null, label: "" };
  const [selectedSpecies, setSelectedSpecies] = useState(clearSpecies);

  // const speciesOptions = [
  //   {
  //     label: "Cat",
  //     value: "Cat",
  //   },
  //   {
  //     label: "Dog",
  //     value: "Dog",
  //   },
  // ];

  const handleUserEntry = (e) => {
    let formFieldValue = e.target.value;
    console.log(`formFieldValue: ${JSON.stringify(formFieldValue)}`);
    const newFormData = {
      ...patientInfo,
      [e.target.name]: formFieldValue,
    };
    console.log(`🤡${JSON.stringify(newFormData)}`);
    setFormData(newFormData);
    props.setPatientInfo(newFormData);
  };

  useEffect(() => {
    setSelectedSpecies(patientInfo.species);
  }, [props.patientInfo]);

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
          Species
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
        {/* <input
          type="text"
          className="form-control"
          id="patientSpecies"
          aria-describedby="patientSpecies"
          name="species"
          value={props.patientInfo.species}
          onChange={handleUserEntry}
        /> */}
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
          Weight
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

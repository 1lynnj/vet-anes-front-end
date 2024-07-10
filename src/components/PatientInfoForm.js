import React from "react";

const PatientInfoForm = ({ patientInfo, onPatientInfoChange, populateHealthyPet }) => { 
  const handleUserEntry = (e) => {
    const { name, value } = e.target;
    const newPatientInfo = {
      ...patientInfo,
      [name]: value
    };
    onPatientInfoChange(newPatientInfo);
  };

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
          value={patientInfo.name}
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
          value={patientInfo.species}
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
          value={patientInfo.signalment}
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
          value={patientInfo.weight}
          onChange={handleUserEntry}
        />
        <p id="form-descriptions">Weight in kg</p>
      </div>
      <div>
        <button
          id="submit-protocol"
          className="btn btn-primary float-end"
          onClick={populateHealthyPet}
        >
          Healthy Pet
        </button>
      </div>
      <p id="page-divider"></p>
    </form>
  );
};

export default PatientInfoForm;

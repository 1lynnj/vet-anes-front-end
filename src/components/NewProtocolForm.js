import { useState } from "react";

const INITIAL_FORM_DATA = {
  patient_name: "",
  signalment: "",
  patient_weight: "",
  drug: "",
  dose: "",
};

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    let dataValue = event.target.value;
    if (
      event.target.name === "dose" ||
      event.target.name === "patient_weight"
    ) {
      dataValue = parseInt(dataValue);
    }
    const newFormData = {
      ...formData,
      [event.target.name]: dataValue,
    };
    // console.log(`🌼${JSON.stringify(newFormData)}`);
    setFormData(newFormData);
  };

  // console.log(`❤️${JSON.stringify(formData)}`);

  const onNewProtocolFormSubmit = (event) => {
    event.preventDefault();
    props.addProtocolCallbackFunc(formData);
    // setFormData(INITIAL_FORM_DATA);
  };

  return (
    <form onSubmit={onNewProtocolFormSubmit}>
      <label htmlFor="patient_name">Patient Name:</label>
      <input
        type="text"
        id="patient_name"
        name="patient_name"
        value={formData.patient_name}
        onChange={handleChange}
      />
      <label htmlFor="signalment">Signalment:</label>
      <input
        type="text"
        id="signalment"
        name="signalment"
        value={formData.signalment}
        onChange={handleChange}
      />

      <label htmlFor="patient_weight">Weight:</label>
      <input
        type="number"
        id="patient_weight"
        name="patient_weight"
        value={formData.patient_weight}
        onChange={handleChange}
      />

      <label htmlFor="drug">Drug:</label>
      <input
        type="text"
        id="drug"
        name="drug"
        value={formData.drug}
        onChange={handleChange}
      />

      <label htmlFor="dose">Dose:</label>
      <input
        type="number"
        id="dose"
        name="dose"
        value={formData.dose}
        onChange={handleChange}
      />
      <input type="submit" value="Submit Form" />
    </form>
  );
};

export default NewProtocolForm;

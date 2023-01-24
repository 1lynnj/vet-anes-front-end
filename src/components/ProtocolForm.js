import { useState } from "react";

const INITIAL_FORM_DATA = {};

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.name,
      [e.target.dose]: e.target.dose,
      [e.target.weight]: e.target.weight,
    };
    setFormData(newFormData);
  };

  const handleNewProtocolSubmit = (e) => {
    e.preventDefault();
    props.addProtocolCallbackFunc(formData);
  };

  return (
    <form onSubmit={handleNewProtocolSubmit}>
      <label htmlFor="name">Drug Name</label>
      <input type="text" value={formData.name} onChange={handleChange} />
    </form>
  );
};

export default NewProtocolForm;

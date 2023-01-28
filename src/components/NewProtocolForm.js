import { useState } from "react";
import NewDrugInput from "./NewDrugInput";

const NewProtocolForm = (props) => {
  const [formData, setFormData] = useState(props.newDrugInputs);
  const onNewProtocolFormSubmit = (event) => {
    event.preventDefault();
    // props.sendNewProtocolToApp(formData);
    // props.loadProtocolDrugList(drugs);
    setFormData({});
  };
  return (
    <div>
      <form onChange={onNewProtocolFormSubmit}>
        <input type="submit" value={"Submit Form"} />
        <h3>Predmedications:</h3>
        <NewDrugInput
          drugData={props.newDrugInputs[0]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[1]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[2]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <h3>Induction:</h3>

        <NewDrugInput
          drugData={props.newDrugInputs[3]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[4]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[5]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <h3>Other medications administered at anesthesia:</h3>
        <NewDrugInput
          drugData={props.newDrugInputs[6]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[7]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[8]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
        <NewDrugInput
          drugData={props.newDrugInputs[9]}
          updateDrugList={props.updateDrugList}
        ></NewDrugInput>
      </form>
    </div>
  );
};

export default NewProtocolForm;

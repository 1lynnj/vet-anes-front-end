import "./App.css";
// import axios from "axios";
import { useEffect, useState } from "react";
// import Test from "./components/TestComponent";
import PatientInfoForm from "./components/PatientInfoForm";
import PatientWeightForm from "./components/PatientWeightForm";
import NewProtocolForm from "./components/NewProtocolForm";
// import NewDrugInput from "./components/NewDrugInput";
// import NewProtocolForm from "./components/NewProtocolForm";

function App() {
  var INITIAL_DRUG_INPUTS = [
    { i: 0, drug: "", dose: "", drugSet: "premed" },
    { i: 1, drug: "", dose: "", drugSet: "premed" },
    { i: 2, drug: "", dose: "", drugSet: "premed" },
    { i: 3, drug: "", dose: "", drugSet: "induction" },
    { i: 4, drug: "", dose: "", drugSet: "induction" },
    { i: 5, drug: "", dose: "", drugSet: "induction" },
    { i: 6, drug: "", dose: "", drugSet: "other" },
    { i: 7, drug: "", dose: "", drugSet: "other" },
    { i: 8, drug: "", dose: "", drugSet: "other" },
    { i: 9, drug: "", dose: "", drugSet: "other" },
  ];

  const [patientInfo, setPatientInfo] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [newDrugInputs, setNewDrugInputs] = useState(INITIAL_DRUG_INPUTS);

  const addNewPatientInfo = (newPatientInfo) => {
    newPatientInfo = {
      name: newPatientInfo.name,
      signalment: newPatientInfo.signalment,
    };
    setPatientInfo(newPatientInfo);
  };

  const addNewPatientWeight = (newPatientWeight) => {
    newPatientWeight = {
      weight: newPatientWeight.weight,
    };
    setPatientWeight(newPatientWeight);
  };

  const updateDrugList = (newDrugData) => {
    // console.log(`2. updateDrugList is being called`);
    //console.log(`😀 ${JSON.stringify(newDrugData)}`);
    const updatedDrugList = [];
    for (const drug of newDrugInputs) {
      if (drug.i !== newDrugData.i) {
        updatedDrugList.push(drug);
      } else {
        const newDrug = {
          ...drug,
          drug: newDrugData.drug,
          dose: newDrugData.dose,
        };
        updatedDrugList.push(newDrug);
      }
      console.log(`updatedDrugList: ${JSON.stringify(updatedDrugList)}`);
      setNewDrugInputs(updatedDrugList);
    }
  };

  return (
    <div>
      <header className="header">
        <h1 cla>Veterinary Anesthesia Protocol</h1>
      </header>
      <div className="patient-information">
        <h3>Patient Information:</h3>
        <PatientInfoForm
          sendPatientInfoToApp={addNewPatientInfo}
        ></PatientInfoForm>
      </div>
      <div className="patient-weight">
        <PatientWeightForm
          sendPatientWeightToApp={addNewPatientWeight}
        ></PatientWeightForm>
      </div>
      <div>
        <NewProtocolForm
          newDrugInputs={newDrugInputs}
          updateDrugList={updateDrugList}
        ></NewProtocolForm>
      </div>
    </div>
  );
}

export default App;

// WORKING FUNCTION
// const loadDrugList = () => {
//   axios
//     // .get("https://vet-anes.herokuapp.com/drugs") // deployed
//     .get("http://127.0.0.1:8000/drugs") // local development
//     .then((response) => {
//       const updatedDrugList = response.data.map((drug) => {
//         return {
//           ...drug,
//         };
//       });
//       // console.log(`🤢 ${JSON.stringify(updatedDrugList)}`);
//       setDrugList(updatedDrugList);
//       // console.log(`🌸 ${JSON.stringify(drugList)}`);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// useEffect(loadDrugList, []);

// NONWORKING FUNCTION
// const loadProtocolDrugList = (NewProtocolFromInfo) => {
//   console.log("load protocol");
//   axios
//     // .post("https://vet-anes.herokuapp.com/new_protocol", params)
//     .post("http://127.0.0.1:8000/new_protocol", NewProtocolFromInfo)
//     .then((response) => {
//       console.log(`👁️${JSON.stringify(response)}`);
//       const updatedProtocolDrugList = response.data.map((protocol) => {
//         return {
//           ...protocol,
//           drug: response.data.drug,
//           concentration: response.data.concentration,
//           concentration_units: response.data.concentration_units,
//           dose: response.data.dose,
//           volume: response.data.volume,
//           route: response.data.route,
//         };
//       });
//       console.log(`🤖${JSON.stringify(updatedProtocolDrugList)}`);
//       setProtocolDrugList(updatedProtocolDrugList);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
// useEffect(loadProtocolDrugList, []);

// RETURN TO LOAD DRUG LIST FROM TEST
// {/* <Test
//   // protocolDrugList={protocolDrugList}
//   drugList={drugList}
//   loadDrugList={loadDrugList}
//   // loadProtocolDrugList={loadProtocolDrugList}
// ></Test> */}
// {/* <NewProtocolForm loadProtocolCallback={loadProtocolDrugList} /> */}

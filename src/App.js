import "./App.css";
import "./vet_logo.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
// import Test from "./components/TestComponent";
import PatientInfoForm from "./components/PatientInfoForm";
// import PatientWeightForm from "./components/PatientWeightForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
// import NewDrugInput from "./components/NewDrugInput";
// import NewProtocolForm from "./components/NewProtocolForm";

function App() {
  var INITIAL_DRUG_INPUTS = [
    { i: 0, drugId: "", dose: "", drugSet: "premed" },
    { i: 1, drugId: "", dose: "", drugSet: "premed" },
    { i: 2, drugId: "", dose: "", drugSet: "premed" },
    { i: 3, drugId: "", dose: "", drugSet: "induction" },
    { i: 4, drugId: "", dose: "", drugSet: "induction" },
    { i: 5, drugId: "", dose: "", drugSet: "induction" },
    { i: 6, drugId: "", dose: "", drugSet: "other" },
    { i: 7, drugId: "", dose: "", drugSet: "other" },
    { i: 8, drugId: "", dose: "", drugSet: "other" },
    { i: 9, drugId: "", dose: "", drugSet: "other" },
  ];

  const [patientInfo, setPatientInfo] = useState("");
  // const [patientWeight, setPatientWeight] = useState("");
  const [newDrugInputs, setNewDrugInputs] = useState(INITIAL_DRUG_INPUTS);
  const [drugOptions, setDrugOptions] = useState([]);

  const addNewPatientInfo = (newPatientInfo) => {
    newPatientInfo = {
      name: newPatientInfo.name,
      signalment: newPatientInfo.signalment,
      weight: newPatientInfo.weight,
    };
    setPatientInfo(newPatientInfo);
  };

  // const addNewPatientWeight = (newPatientWeight) => {
  //   newPatientWeight = {
  //     weight: newPatientWeight.weight,
  //   };
  //   setPatientWeight(newPatientWeight);
  // };

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
          drugId: newDrugData.drugId,
          dose: newDrugData.dose,
        };
        updatedDrugList.push(newDrug);
      }
      // console.log(`updatedDrugList: ${JSON.stringify(updatedDrugList)}`);
      setNewDrugInputs(updatedDrugList);
    }
  };
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];
  const loadDrugOptions = () => {
    axios
      // .get("https://vet-anes.herokuapp.com/drugs") // deployed
      .get("http://127.0.0.1:8000/drugs") // local development
      .then((response) => {
        const updatedDrugOptions = response.data.map((drug) => {
          return {
            value: drug.id,
            label: drug.name,
          };
        });
        // updatedDrugOptions.unshift({ value: null, label: " " });
        // console.log(`🤢 ${JSON.stringify(updatedDrugOptions)}`);
        setDrugOptions(updatedDrugOptions);
        // console.log(`🌸 ${JSON.stringify(drugList)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  return (
    <div className="container">
      <Header></Header>
      <h3>Patient Information:</h3>

      <PatientInfoForm
        sendPatientInfoToApp={addNewPatientInfo}
      ></PatientInfoForm>
      {/* <PatientWeightForm
          sendPatientWeightToApp={addNewPatientWeight}
        ></PatientWeightForm> */}
      <NewProtocolForm
        drugOptions={drugOptions}
        newDrugInputs={newDrugInputs}
        updateDrugList={updateDrugList}
      ></NewProtocolForm>
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

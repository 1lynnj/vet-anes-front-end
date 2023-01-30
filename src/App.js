import "./App.css";
import "./vet_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfoForm from "./components/PatientInfoForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  var INITIAL_DRUG_INPUTS = [
    { i: 0, drugId: "", dose: "", drugSet: "premed", volume: "", route: "" },
    { i: 1, drugId: "", dose: "", drugSet: "premed", volume: "", route: "" },
    { i: 2, drugId: "", dose: "", drugSet: "premed", volume: "", route: "" },
    { i: 3, drugId: "", dose: "", drugSet: "induction", volume: "", route: "" },
    { i: 4, drugId: "", dose: "", drugSet: "induction", volume: "", route: "" },
    { i: 5, drugId: "", dose: "", drugSet: "induction", volume: "", route: "" },
    { i: 6, drugId: "", dose: "", drugSet: "other", volume: "", route: "" },
    { i: 7, drugId: "", dose: "", drugSet: "other", volume: "", route: "" },
    { i: 8, drugId: "", dose: "", drugSet: "other", volume: "", route: "" },
    { i: 9, drugId: "", dose: "", drugSet: "other", volume: "", route: "" },
  ];

  const [patientInfo, setPatientInfo] = useState("");
  // const [patientWeight, setPatientWeight] = useState("");
  const [newDrugInputs, setNewDrugInputs] = useState(INITIAL_DRUG_INPUTS);
  const [drugOptions, setDrugOptions] = useState([]);
  const [calculationParameters, setCalculationParameters] = useState([]);

  // const addNewPatientInfo = (newPatientInfo) => {
  //   newPatientInfo = {
  //     name: newPatientInfo.name,
  //     signalment: newPatientInfo.signalment,
  //     weight: newPatientInfo.weight,
  //   };
  //   setPatientInfo(newPatientInfo);
  // };

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

  const loadDrugOptions = () => {
    axios
      .get("https://vet-anes.herokuapp.com/drugs") // deployed
      // .get("http://127.0.0.1:8000/drugs") // local development
      .then((response) => {
        const updatedDrugOptions = response.data.map((drug) => {
          return {
            value: drug.id,
            label: drug.name,
          };
        });
        // console.log(`🤢 ${JSON.stringify(updatedDrugOptions)}`);
        setDrugOptions(updatedDrugOptions);
        // console.log(`🌸 ${JSON.stringify(drugList)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  // console.log(`🤪${JSON.stringify(newDrugInputs)}`);

  const loadCalculations = () => {
    console.log("load calculations called");
    const params = [];
    let newDrug = {};
    for (const drug of newDrugInputs) {
      // console.log(`-----> ${JSON.stringify(drug)}`);
      if (drug.drugId !== "") {
        newDrug = {
          drugId: drug.drugId,
          dose: drug.dose,
          weight: patientInfo.weight,
        };
        params.push(newDrug);
      }
    }
    // console.log(`🌝 ${JSON.stringify(params)}`);
    // setCalculationParameters(params);
    // console.log(`😶‍🌫️${JSON.stringify(calculationParameters)}`);

    axios
      .post("https://vet-anes.herokuapp.com/new_protocol", params)
      // .post("http://127.0.0.1:8000/new_protocol")
      .then((response) => {
        console.log(`👁️${JSON.stringify(response)}`);
        const updatedProtocolDrugList = response.data.map((protocol) => {
          return {
            ...protocol,
            // drug: response.data.drug,
            // concentration: response.data.concentration,
            // concentration_units: response.data.concentration_units,
            // dose: response.data.dose,
            volume: response.data.volume,
            route: response.data.route,
          };
        });
        console.log(`🤖${JSON.stringify(updatedProtocolDrugList)}`);
        // setNewDrugInputs(updatedProtocolDrugList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // loadCalculations(calculationParameters);

  return (
    <div className="container">
      <Header></Header>
      {/* <Navbar></Navbar> */}

      <PatientInfoForm setPatientInfo={setPatientInfo}></PatientInfoForm>
      {/* <PatientWeightForm
          sendPatientWeightToApp={addNewPatientWeight}
        ></PatientWeightForm> */}
      <NewProtocolForm
        drugOptions={drugOptions}
        newDrugInputs={newDrugInputs}
        updateDrugList={updateDrugList}
        // loadCalculations={loadCalculations}
      ></NewProtocolForm>
      <button
        onClick={() => {
          loadCalculations();
        }}
        className="btn btn-primary"
        type="submit"
      >
        Submit Protocol
      </button>
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

// RETURN TO LOAD DRUG LIST FROM TEST
// {/* <Test
//   // protocolDrugList={protocolDrugList}
//   drugList={drugList}
//   loadDrugList={loadDrugList}
//   // loadProtocolDrugList={loadProtocolDrugList}
// ></Test> */}
// {/* <NewProtocolForm loadProtocolCallback={loadProtocolDrugList} /> */}

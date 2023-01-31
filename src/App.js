import "./App.css";
import "./vet_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfoForm from "./components/PatientInfoForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  var INITIAL_PROTOCOL_DRUG_LIST = [
    { i: 0, drugId: "1", dose: "", drugSet: "premed", volume: "", route: "" },
    { i: 1, drugId: "2", dose: "", drugSet: "premed", volume: "", route: "" },
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
  const [protocolDrugList, setProtocolDrugList] = useState(
    INITIAL_PROTOCOL_DRUG_LIST
  );
  const [drugOptions, setDrugOptions] = useState([]);
  const [pqqqqqqqqq, setPqqqqqqqqq] = useState([]);

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
    for (const drug of protocolDrugList) {
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
      setProtocolDrugList(updatedDrugList);
    }
  };

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
        // console.log(`🤢 ${JSON.stringify(updatedDrugOptions)}`);
        setDrugOptions(updatedDrugOptions);
        // console.log(`🌸 ${JSON.stringify(drugList)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  // console.log(`🤪${JSON.stringify(protocolDrugList)}`);

  const loadCalculations = () => {
    console.log("load calculations called");
    const params = [];
    let newDrug = {};
    for (const drug of protocolDrugList) {
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
      // .post("https://vet-anes.herokuapp.com/new_protocol", params)
      .post("http://127.0.0.1:8000/new_protocol", params)
      .then((response) => {
        console.log(`👁️${JSON.stringify(response)}`);

        let calculatedDrugList = response.data;
        console.log(`-----> ${JSON.stringify(calculatedDrugList)}`);

        let updatedDrugList = [];
        for (const drug1 of protocolDrugList) {
          let newDrug = drug1;
          for (const drug2 of calculatedDrugList) {
            if (drug1.drugId === drug2.id) {
              newDrug = {
                ...drug1,
                volume: drug2.volume,
                route: drug2.route,
              };
            }
          }
          updatedDrugList.push(newDrug);
        }

        // if (drug1.drugId === drug2.id) {
        //   console.log(`drug2.id: ${drug2.id}`);
        //   const newDrug = {
        //     ...drug1,
        //     volume: drug2.volume,
        //     route: drug2.route,
        //   };
        //   updatedDrugList.push(newDrug);
        // }
        // else {
        //   console.log(`drug1.id: ${drug1.id}`);
        //   updatedDrugList.push(drug1);
        // }
        //   }
        // }

        // const updatedProtocolDrugList = response.data.map((protocol) => {});

        console.log(`🤖🤖 ${JSON.stringify(updatedDrugList)}`);
        setProtocolDrugList(updatedDrugList);
        // console.log(`❤️ ${JSON.stringify(pqqqqqqqqq)}`);
      })
      // .then((updatedPqqqqqqqqq) => {})
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
        protocolDrugList={protocolDrugList}
        updateDrugList={updateDrugList}
        pqqqqqqqqq={pqqqqqqqqq}
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
//   // pqqqqqqqqq={pqqqqqqqqq}
//   drugList={drugList}
//   loadDrugList={loadDrugList}
//   // loadPqqqqqqqqq={loadPqqqqqqqqq}
// ></Test> */}
// {/* <NewProtocolForm loadProtocolCallback={loadPqqqqqqqqq} /> */}

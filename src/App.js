import "./App.css";
import "./vet_logo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfoForm from "./components/PatientInfoForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
import ERDrugList from "./components/ERDrugList";
import FluidRatesList from "./components/FluidRatesList";
import FentanylCRIList from "./components/FentanylCRIList";

function App() {
  var INITIAL_PROTOCOL_DRUG_LIST = [
    {
      i: 0,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      selectedOption: null,
    },
    {
      i: 1,
      drugId: "",
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 2,
      drugId: "",
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 3,
      drugId: "",
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 4,
      drugId: "",
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 5,
      drugId: "",
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 6,
      drugId: "",
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 7,
      drugId: "",
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 8,
      drugId: "",
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      selectedOption: "",
    },
    {
      i: 9,
      drugId: "",
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      selectedOption: "",
    },
  ];

  const INITIAL_PATIENT_INFO = {
    name: "",
    signalment: "",
    weight: "",
    species: "",
  };

  const [patientInfo, setPatientInfo] = useState(INITIAL_PATIENT_INFO);
  const [protocolDrugList, setProtocolDrugList] = useState(
    INITIAL_PROTOCOL_DRUG_LIST
  );
  const [drugOptions, setDrugOptions] = useState([]);
  const [erDrugList, setERDrugList] = useState([]);
  const [fluidRatesList, setFluidRatesList] = useState([]);
  const [fentanylCRIList, setFentanylCRIList] = useState([]);

  const newPatient = () => {
    setPatientInfo(INITIAL_PATIENT_INFO);
    setProtocolDrugList(INITIAL_PROTOCOL_DRUG_LIST);
    setERDrugList([]);
    setFluidRatesList([]);
    setFentanylCRIList([]);
  };

  // useEffect(() => {
  //   setProtocolDrugList();
  // }, []);

  const updateDrugList = (newDrugData) => {
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
        setDrugOptions(updatedDrugOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  const loadCalculations = () => {
    console.log("load calculations called");
    const params = [];
    let newDrug = {};
    for (const drug of protocolDrugList) {
      if (drug.drugId !== "") {
        newDrug = {
          drugId: drug.drugId,
          dose: drug.dose,
          weight: patientInfo.weight,
        };
        params.push(newDrug);
      }
    }
    axios
      // .post("https://vet-anes.herokuapp.com/new_protocol", params)
      .post("http://127.0.0.1:8000/new_protocol", params)
      .then((response) => {
        let calculatedDrugList = response.data;

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

        setProtocolDrugList(updatedDrugList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadERDrugList = () => {
    console.log("load er drug calculations called");
    let weight = { weight: patientInfo.weight };
    axios
      // .post("https://vet-anes.herokuapp.com/er_drugs", weight)
      .post("http://127.0.0.1:8000/er_drugs", weight)
      .then((response) => {
        setERDrugList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadFluidRatesList = () => {
    console.log("load fluid rates called");
    let weight = patientInfo.weight;
    let species = patientInfo.species;
    let params = { weight: weight, species: species };
    console.log(`❤️${JSON.stringify(params)}`);
    axios
      // .post("https://vet-anes.herokuapp.com/fluid_rates", params)
      .post("http://127.0.0.1:8000/fluid_rates", params)
      .then((response) => {
        setFluidRatesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadFentanylCRIList = () => {
    console.log("load fentanyl cri list called");
    let weight = { weight: patientInfo.weight };
    axios
      // .post("https://vet-anes.herokuapp.com/fentanyl_cri", weight)
      .post("http://127.0.0.1:8000/fentanyl_cri", weight)
      .then((response) => {
        setFentanylCRIList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitProtocol = (e) => {
    e.preventDefault();
    loadCalculations();
    loadERDrugList();
    loadFluidRatesList();
    loadFentanylCRIList();
  };

  return (
    <div className="container">
      <Header newPatient={newPatient}></Header>
      <PatientInfoForm
        setPatientInfo={setPatientInfo}
        patientInfo={patientInfo}
      ></PatientInfoForm>
      <NewProtocolForm
        drugOptions={drugOptions}
        protocolDrugList={protocolDrugList}
        updateDrugList={updateDrugList}
      ></NewProtocolForm>
      <button
        onClick={submitProtocol}
        className="btn btn-primary"
        id="submit-protocol"
        type="submit"
      >
        Submit Protocol
      </button>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <FluidRatesList fluidRatesList={fluidRatesList}></FluidRatesList>
        </div>
        <div className="col-xs-12 col-sm-6">
          <FentanylCRIList fentanylCRIList={fentanylCRIList}></FentanylCRIList>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <ERDrugList erDrugList={erDrugList}></ERDrugList>
        </div>
      </div>
    </div>
  );
}

export default App;

// WORKING FUNCTION
// const loadDatabaseDrugList = () => {
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

// useEffect(loadDatabaseDrugList, []);

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

import "./App.css";
// import "./vet_logo.png";
import "./vetLogo.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfoForm from "./components/PatientInfoForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
import ERDrugList from "./components/ERDrugList";
import FluidRatesList from "./components/FluidRatesList";
import FentanylCRIList from "./components/FentanylCRIList";

// TO DO: Move constants to data file and import where needed
// TO DO: Add drugSet category to backend and remove hardcoded data
function App() {
  const INITIAL_PROTOCOL_DRUG_LIST = [
    {
      i: 0,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
    },
    {
      i: 1,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
    },
    {
      i: 2,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
    },
    {
      i: 3,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
    },
    {
      i: 4,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
    },
    {
      i: 5,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
    },
    {
      i: 6,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
    },
    {
      i: 7,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
    },
    {
      i: 8,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
    },
    {
      i: 9,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
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

  // For development
  const BACKEND_HOST = ["localhost", "127.0.0.1"].includes(
    window.location.hostname
  )
    ? `http://${window.location.hostname}:8000`
    : "https://vet-anes.herokuapp.com";

  const newPatient = () => {
    setPatientInfo(INITIAL_PATIENT_INFO);
    setProtocolDrugList(INITIAL_PROTOCOL_DRUG_LIST);
    setERDrugList([]);
    setFluidRatesList([]);
    setFentanylCRIList([]);
  };

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
      .get(`${BACKEND_HOST}/drugs`) // deployed
      // .get("http://127.0.0.1:8000/drugs") // local development
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
      .post(`${BACKEND_HOST}/new_protocol`, params)
      // .post("http://127.0.0.1:8000/new_protocol", params)
      .then((response) => {
        let calculatedDrugList = response.data;

        // TO DO: Refactor to remove nested for loop
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
      .post(`${BACKEND_HOST}/er_drugs`, weight)
      // .post("http://127.0.0.1:8000/er_drugs", weight)
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
    axios
      .post(`${BACKEND_HOST}/fluid_rates`, params)
      // .post("http://127.0.0.1:8000/fluid_rates", params)
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
      .post(`${BACKEND_HOST}/fentanyl_cri`, weight)
      // .post("http://127.0.0.1:8000/fentanyl_cri", weight)
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
        <div className="col-xs-12 col-sm-7">
          <FluidRatesList fluidRatesList={fluidRatesList}></FluidRatesList>
        </div>
        <div className="col-xs-12 col-sm-3">
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

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
import Footer from "./components/Footer";
import DrugInteractionsForm from "./components/DrugInteractionsForm";
import DrugInteractions from "./components/DrugInteractions";

// TO DO: Move constants to data file and import where needed
// TO DO: Add drugSet category to backend and remove hardcoded data
function App() {
  const DOG_PROTOCOL_DRUG_LIST = [
    {
      i: 0,
      drugId: 42,
      dose: 1,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 1,
      drugId: 13,
      dose: 0.05,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 2,
      drugId: 21,
      dose: 0.2,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 3,
      drugId: 23,
      dose: 4,
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 4,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 5,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 6,
      drugId: 26,
      dose: 22,
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 7,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 8,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 9,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
  ];

  const CAT_PROTOCOL_DRUG_LIST = [
    {
      i: 0,
      drugId: 42,
      dose: 1,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 1,
      drugId: 15,
      dose: 0.2,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 2,
      drugId: 21,
      dose: 0.2,
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 3,
      drugId: 23,
      dose: 4,
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 4,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 5,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 6,
      drugId: 26,
      dose: 22,
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 7,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 8,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 9,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
  ];

  const INITIAL_PROTOCOL_DRUG_LIST = [
    {
      i: 0,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 1,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 2,
      drugId: null,
      dose: "",
      drugSet: "premed",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 3,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 4,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 5,
      drugId: null,
      dose: "",
      drugSet: "induction",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 6,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 7,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 8,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 9,
      drugId: null,
      dose: "",
      drugSet: "other",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 10,
      drugId: null,
      dose: "",
      drugSet: "oral",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 11,
      drugId: null,
      dose: "",
      drugSet: "oral",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 12,
      drugId: null,
      dose: "",
      drugSet: "oral",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 13,
      drugId: null,
      dose: "",
      drugSet: "oral",
      volume: "",
      route: "",
      rxcui_code: "",
    },
    {
      i: 14,
      drugId: null,
      dose: "",
      drugSet: "oral",
      volume: "",
      route: "",
      rxcui_code: "",
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
  const [interactionsDrugList, setInteractionsDrugList] = useState([]);
  const [drugInteractions, setDrugInteractions] = useState([]);

  // For development
  const BACKEND_HOST = ["localhost", "127.0.0.1"].includes(
    window.location.hostname
  )
    ? `http://${window.location.hostname}:8000`
    : "https://vet-anes.herokuapp.com";

  const populateHealthyPet = (e) => {
    e.preventDefault();
    if (patientInfo.species === "cat" || patientInfo.species === "Cat") {
      setProtocolDrugList(CAT_PROTOCOL_DRUG_LIST);
    } else if (patientInfo.species === "dog" || patientInfo.species === "Dog") {
      setProtocolDrugList(DOG_PROTOCOL_DRUG_LIST);
    }
  };

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
          rxcui_code: newDrugData.rxcui_code,
        };
        updatedDrugList.push(newDrug);
      }
      setProtocolDrugList(updatedDrugList);
    }
  };

  const updateInteractionsDrugList = () => {
    const updatedDrugList = [];
    for (const protocolDrug of protocolDrugList) {
      if (protocolDrug.rxcui_code) {
        const rxcuiCode = protocolDrug.rxcui_code;
        updatedDrugList.push(rxcuiCode);
      }
    }
    setInteractionsDrugList(updatedDrugList);
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
            rxcui_code: drug.rxcui_code,
          };
        });
        setDrugOptions(updatedDrugOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  const loadDrugInteractions = () => {
    let rxcuiCodes = interactionsDrugList.join("+");
    if (rxcuiCodes.length > 0) {
      axios
        .get(
          `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuiCodes}`
        )
        .then((response) => {
          // console.log(`------------->>>>>> ${JSON.stringify(response.data)}`);
          setDrugInteractions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
        populateHealthyPet={populateHealthyPet}
      ></PatientInfoForm>
      <NewProtocolForm
        drugOptions={drugOptions}
        protocolDrugList={protocolDrugList}
        updateDrugList={updateDrugList}
        interactionsDrugList={interactionsDrugList}
        updateInteractionsDrugList={updateInteractionsDrugList}
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
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <DrugInteractionsForm
            drugOptions={drugOptions}
            protocolDrugList={protocolDrugList}
            updateDrugList={updateDrugList}
            interactionsDrugList={interactionsDrugList}
            updateInteractionsDrugList={updateInteractionsDrugList}
          ></DrugInteractionsForm>
        </div>
      </div>

      <DrugInteractions
        loadDrugInteractions={loadDrugInteractions}
        drugInteractions={drugInteractions}
      ></DrugInteractions>
      <Footer></Footer>
    </div>
  );
}

export default App;

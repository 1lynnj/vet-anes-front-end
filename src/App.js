import "./App.css";
import vetLogo from "./vetLogo.png";
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

// TO DO: Add drugSet category to backend and remove hardcoded data
function App() {
  const INITIAL_PROTOCOL_DRUG_LIST = require("./data/InitialProtocolDrugList.json");
  const CAT_PROTOCOL_DRUG_LIST = require("./data/CatProtocolDrugList.json");
  const DOG_PROTOCOL_DRUG_LIST = require("./data/DogProtocolDrugList.json");

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
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    updateInteractionsDrugList(protocolDrugList);
  }, [protocolDrugList]);

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

  //Clears the state of all components to start a new patient
  const newPatient = () => {
    setPatientInfo(INITIAL_PATIENT_INFO);
    setProtocolDrugList(INITIAL_PROTOCOL_DRUG_LIST);
    setERDrugList([]);
    setFluidRatesList([]);
    setFentanylCRIList([]);
    setDrugInteractions([]);
  };

  //Updates drug list for use in protocol drug list and interactions drug list
  const updateDrugList = (newDrugData) => {
    const updatedDrugList = [];
    for (const drug of protocolDrugList) {
      if (drug.i !== newDrugData.i) {
        updatedDrugList.push(drug);
      } else {
        const newDrug = {
          ...drug,
          drugId: newDrugData.drugId,
          dose: newDrugData.drugId ? newDrugData.dose : "",
          rxcui_code: newDrugData.rxcui_code,
          volume: newDrugData.drugId ? newDrugData.volume : "",
          route: newDrugData.drugId ? newDrugData.route : "",
        };
        updatedDrugList.push(newDrug);
      }
      setProtocolDrugList(updatedDrugList);
    }
    updateInteractionsDrugList();
  };

  //Updates list of rxcui codes for NIH API call
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

  // Options for react Select element in DrugInput and OralDrugInput form fields
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
            cat_low_dose: drug.cat_low_dose,
            cat_high_dose: drug.cat_high_dose,
            dog_low_dose: drug.dog_low_dose,
            dog_high_dose: drug.dog_high_dose,
          };
        });
        setDrugOptions(updatedDrugOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugOptions, []);

  //API call to NIH drug interactions
  const loadDrugInteractions = () => {
    let rxcuiCodes = interactionsDrugList.join("+");
    if (rxcuiCodes.length > 0) {
      axios
        .get(
          `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuiCodes}`
        )
        .then((response) => {
          setDrugInteractions(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // TODO: Add species to trigger dose range warning
  //Drug calculations for user required protocol
  const loadCalculations = () => {
    const params = [];
    let newDrug = {};
    for (const drug of protocolDrugList) {
      if (drug.drugId !== "") {
        newDrug = {
          drugId: drug.drugId,
          dose: drug.dose,
          weight: patientInfo.weight,
          species: patientInfo.species,
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

  useEffect(loadDrugInteractions, []);

  //Returns calculations for ER Drug Doses
  const loadERDrugList = () => {
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

  //Returns calculations for fluid rates
  const loadFluidRatesList = () => {
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

  //Returns calculations for fentanyl CRI
  const loadFentanylCRIList = () => {
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

  //Calls functions for all calculations and NIH API call
  const submitProtocol = (e) => {
    e.preventDefault();
    loadCalculations();
    loadERDrugList();
    loadFluidRatesList();
    loadFentanylCRIList();
    loadDrugInteractions();
  };

  //Shows disclaimer on initial page load
  const hideDisclaimer = (e) => {
    setShowDisclaimer(false);
  };

  return (
    <div className="outer-container">
      <div
        className={
          showDisclaimer
            ? "disclaimer-container d-flex d-column align-items-center"
            : "d-none"
        }
      >
        <div className="container disclaimer">
          <div className="row">
            <div className="col">
              <div
                className="bubble text-center d-flex flex-column align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <img src={vetLogo} alt="logo" />
                <h1>Veterinary Anesthesia Protocol</h1>
                <h3>
                  This is a DEMO project in development.<br></br> Not meant for
                  use.
                </h3>
                <br></br>
                <button
                  className="btn btn-primary"
                  id="submit-protocol"
                  onClick={hideDisclaimer}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"container " + (!showDisclaimer ? "" : "d-none")}>
        <Header newPatient={newPatient}></Header>
        <p id="page-divider"></p>
        <PatientInfoForm
          setPatientInfo={setPatientInfo}
          patientInfo={patientInfo}
          populateHealthyPet={populateHealthyPet}
        ></PatientInfoForm>
        <NewProtocolForm
          patientInfo={patientInfo}
          drugOptions={drugOptions}
          protocolDrugList={protocolDrugList}
          updateDrugList={updateDrugList}
          interactionsDrugList={interactionsDrugList}
          updateInteractionsDrugList={updateInteractionsDrugList}
        ></NewProtocolForm>
        <div>
          <DrugInteractionsForm
            drugOptions={drugOptions}
            protocolDrugList={protocolDrugList}
            updateDrugList={updateDrugList}
            interactionsDrugList={interactionsDrugList}
            updateInteractionsDrugList={updateInteractionsDrugList}
          ></DrugInteractionsForm>
        </div>
        <button
          onClick={submitProtocol}
          className="btn btn-primary float-end"
          id="submit-protocol"
          type="submit"
        >
          Submit Protocol
        </button>
        <br></br>
        <br></br>
        <p id="page-divider"></p>
        <h4 id="fluid-rates-header">
          Fluid Rates, Pain CRI and Emergency Drug Dosages:
        </h4>
        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <FluidRatesList fluidRatesList={fluidRatesList}></FluidRatesList>
          </div>
          <div className="col-xs-12 col-sm-3">
            <FentanylCRIList
              fentanylCRIList={fentanylCRIList}
            ></FentanylCRIList>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <ERDrugList erDrugList={erDrugList}></ERDrugList>
          </div>
        </div>

        <div id="drug-reactions-container">
          <DrugInteractions
            loadDrugInteractions={loadDrugInteractions}
            drugInteractions={drugInteractions}
          ></DrugInteractions>
        </div>

        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;

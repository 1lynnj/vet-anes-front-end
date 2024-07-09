import "./App.css";
import vetLogo from "./vetLogo7.png";
import axios from "axios";
import { useEffect, useState } from "react";
import PatientInfoForm from "./components/PatientInfoForm";
import NewProtocolForm from "./components/NewProtocolForm";
import Header from "./components/Header";
import ERDrugList from "./components/ERDrugList";
import FluidRatesList from "./components/FluidRatesList";
import FentanylCRIList from "./components/FentanylCRIList";
import Footer from "./components/Footer";

// TODO: Add drugSet category to backend and remove hardcoded data
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
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handlePatientInfoUpdate = async (newPatientInfo) => {
    setPatientInfo(newPatientInfo);
    const loadERDrugList = () => {
      let weight = parseFloat(newPatientInfo.weight);
      let species = newPatientInfo.species;
      if (!isNaN(weight) && species) {
        // Construct the payload correctly
        const payload = {
          weight: weight,
          species: species
        };

        axios
          .post(`${BACKEND_HOST}/er_drugs`, payload)
          .then((response) => {
            setERDrugList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    
    // Call loadERDrugList after its declaration
    loadERDrugList();

  const loadFluidRatesList = () => {
    let weight = parseFloat(newPatientInfo.weight);
    let species = newPatientInfo.species;
    if (!isNaN(weight) && species) {
      // Construct the payload correctly
      const params = {
        weight: weight,
        species: species
      };
    
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
  };
    loadFluidRatesList();

  const loadFentanylCRIList = () => {
    let weight = parseFloat(newPatientInfo.weight);      
    if (weight) {
      axios
      .post(`${BACKEND_HOST}/fentanyl_cri`, { weight: weight })
      // .post("http://127.0.0.1:8000/fentanyl_cri", weight)
      .then((response) => {
        setFentanylCRIList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
  loadFentanylCRIList();
    

  // TODO: Needs dose in addition to weight and species
  //   const loadCalculations = () => {
  //     let weight = parseFloat(newPatientInfo.weight);
  //     let species = newPatientInfo.species;
  //     const params = [];
  //     let newDrug = {};
  //     for (const drug of protocolDrugList) {
  //       if (drug.drugId !== "") {
  //         newDrug = {
  //           drugId: drug.drugId,
  //           dose: drug.dose,
  //           weight: weight,
  //           species: species,
  //         };
  //         params.push(newDrug);
  //       }
  //     }
  //     console.log(params);
  //     axios
  //       .post(`${BACKEND_HOST}/new_protocol`, params)
  //       // .post("http://127.0.0.1:8000/new_protocol", params)
  //       .then((response) => {
  //         let calculatedDrugList = response.data;
  
  //         // TO DO: Refactor to remove nested for loop
  //         let updatedDrugList = [];
  //         for (const drug1 of protocolDrugList) {
  //           let newDrug = drug1;
  //           for (const drug2 of calculatedDrugList) {
  //             if (drug1.drugId === drug2.id) {
  //               newDrug = {
  //                 ...drug1,
  //                 volume: drug2.volume,
  //                 route: drug2.route,
  //               };
  //             }
  //           }
  //           updatedDrugList.push(newDrug);
  //         }
  //         setProtocolDrugList(updatedDrugList);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     }
  // loadCalculations();
  };
  
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
    }

  //Calls functions for all calculations and NIH API call
  const submitProtocol = (e) => {
    e.preventDefault();
    loadCalculations();
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
                className="bubble text-left d-flex flex-column align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <img src={vetLogo} alt="logo" />
                <h1>Veterinary Anesthesia Protocol</h1>
                <h3>
                  This project is currently a DEMO in the development phase and is
                  not intended for operational use. The developers and associated
                  parties disclaim any and all liability for any use or reliance
                  on this project in its current state.
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
          onPatientInfoChange={handlePatientInfoUpdate}
          populateHealthyPet={populateHealthyPet}
        ></PatientInfoForm>
        <NewProtocolForm
          patientInfo={patientInfo}
          drugOptions={drugOptions}
          protocolDrugList={protocolDrugList}
          updateDrugList={updateDrugList}
        ></NewProtocolForm>
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
            <FentanylCRIList fentanylCRIList={fentanylCRIList}></FentanylCRIList>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <ERDrugList erDrugList={erDrugList}></ERDrugList>
          </div>
        </div>
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Test from "./components/TestComponent";
import NewProtocolForm from "./components/NewProtocolForm";

function App() {
  const [drugList, setDrugList] = useState([]);
  const [protocol, setProtocol] = useState([]);

  // var apiHost = null;
  // if (window.location.host === "localhost:3000") {
  //   apiHost = "http://127.0.0.1:8000";
  // } else {
  //   apiHost = "https://vet-anes.herokuapp.com";
  // }

  const loadDrugList = () => {
    axios
      // .get(`${apiHost}/drugs`)
      .get("https://vet-anes.herokuapp.com/drugs") // deployed
      // .get("http://127.0.0.1:8000/drugs") // local development
      .then((response) => {
        const updatedDrugList = response.data.map((drug) => {
          return {
            ...drug,
            // id: drug.id,
            // name: drug.name,
            // concentration: drug.concentration,
            // concentration_units: drug.concentration_units,
            // route: drug.route,
          };
        });
        // console.log(`🤢 ${JSON.stringify(updatedDrugList)}`);
        setDrugList(updatedDrugList);
        // console.log(`🌸 ${JSON.stringify(drugList)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugList, []);

  // DO I NEED A PATIENT DRUG LIST TO LOOP THROUGH TO MAKE POST REQUEST AND THEN TO DISPLAY DATA FOR EACH?

  // const newProtocol = (newProtocolInfo) => {
  //   axios
  //     .post("http://127.0.0.1:8000/protocol/drugs", newProtocolInfo)
  //     .then((response) => {
  //       const newProtocolData = {
  //         drug: response.data.drug,
  //         concentration: response.data.concentration,
  //         dose: response.data.dose,
  //         volume: response.data.volume,
  //         route: response.data.route,
  //       };
  //       setProtocol(newProtocolData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const apiCall = (params) => {
    axios
      // .post(`${apiHost}/drugs`, params)
      .post("https://vet-anes.herokuapp.com/new_protocol", params)
      // .post("http://127.0.0.1:8000/new_protocol", params)
      .then((response) => {
        console.log(`👁️${JSON.stringify(response)}`);
        const protocol_data = {
          drug: response.data.drug,
          volume: response.data.volume,
        };
        console.log(`🤡${JSON.stringify(protocol_data)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const params = {
    drug: "Hydromorphone",
    dose: 0.2,
    weight: 30,
  };

  apiCall(params);

  return (
    <div>
      <Test drugList={drugList} loadDrugList={loadDrugList}></Test>
      {/* <NewProtocolForm onNewProtocolFormSubmit={newProtocol} /> */}
    </div>
  );
}

export default App;

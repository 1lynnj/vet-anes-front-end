import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Test from "./components/TestComponent";
import NewProtocolForm from "./components/ProtocolForm";

// comment

function App() {
  const [drugList, setDrugList] = useState([]);

  const loadDrugList = () => {
    axios
      .get("https://vet-anes.herokuapp.com/protocol/drugs") // deployed
      // .get("http://127.0.0.1:8000/protocol/drugs") // local development
      .then((response) => {
        const updatedDrugList = response.data.map((drug) => {
          return {
            id: drug.id,
            name: drug.name,
            concentration: drug.concentration,
            concentration_units: drug.concentration_units,
            route: drug.route,
          };
        });
        setDrugList(updatedDrugList);
        console.log(`🌸 ${JSON.stringify(drugList)}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(loadDrugList, []);

  const addProtocol = (newProtocolInfo) => {
    axios.post();
  };

  return (
    <div>
      <Test drugList={drugList} loadDrugList={loadDrugList}></Test>
      <NewProtocolForm addProtocolCallbackFunc={addProtocol} />
    </div>
  );
}

export default App;

// const addNewDrug = (newDrugInfo) => {
//   console.log("create new drug called");
//   axios
//     .post("https://vet-anes.herokuapp.com/protocol/drugs", newDrugInfo)
//     .then((response) => {
//       const newDrugs = [...drugList];
//       const newDrugJSON = {
//         ...newDrugInfo,
//         id: response.data.id,
//         name: response.data.name,
//         concentration: response.data.concentration,
//         concentration_units: response.data.concentration_units,
//         route: response.data.route,
//       };
//       newDrugs.push(newDrugJSON);
//       setDrugList(newDrugs);
//       loadDrugList();
//       console.log(`${JSON.stringify(response)}`);
//       // DO STUFF
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

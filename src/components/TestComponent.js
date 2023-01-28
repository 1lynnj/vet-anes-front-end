import React from "react";

// comment

const Test = ({ drugList }) => {
  console.log(`😾${drugList}`);
  const drugComponents = [];
  for (const drug of drugList) {
    drugComponents.push(
      <li key={drug.id}>
        {drug.name} {drug.concentration} {drug.concentration_units} {drug.dose}
        {drug.volume} {drug.route}
      </li>
    );
  }
  return (
    <div>
      <h3>Drugs</h3>
      <ul>{drugComponents}</ul>
    </div>
  );
};

export default Test;
